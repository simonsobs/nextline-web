import { Client, CombinedError } from "@urql/vue";
import { describe, expect, it, vi } from "vitest";
import type { MaybeRef } from "vue";
import { ref } from "vue";
import type { Subject } from "wonka";
import { fromValue, makeSubject, never } from "wonka";

import type { CtrlStateQuery } from "@/graphql/codegen/generated";
import { useCtrlStateQuery } from "@/graphql/codegen/generated";

import { useInSetupWithUrqlClient } from "./setup-with-client";

function useQueryFromClient(client: MaybeRef<Client>) {
  const disposable = useInSetupWithUrqlClient(
    () => useCtrlStateQuery({ variables: {} }),
    client
  );
  const { ret: query } = disposable;
  return { query, [Symbol.dispose]: () => disposable[Symbol.dispose]() };
}

describe("useCtrlStateQuery with mock client", () => {
  it("executeQuery is called", () => {
    const executeQuery = vi.fn();
    const client = ref({ executeQuery });
    using _ = useQueryFromClient(client as any);
    expect(executeQuery).toBeCalledTimes(1);
  });

  it("fetching", () => {
    const executeQuery = vi.fn(() => never);
    const client = ref({ executeQuery });
    using res = useQueryFromClient(client as any);
    const { query } = res;
    expect(executeQuery).toBeCalledTimes(1);
    expect(query.fetching.value).toBe(true);
  });

  it("data", async () => {
    const data: CtrlStateQuery = { ctrl: { state: "initialized" } };
    const executeQuery = vi.fn(() => fromValue({ data }));
    const client = ref({ executeQuery });
    using res = useQueryFromClient(client as any);
    const { query } = res;
    expect(executeQuery).toBeCalledTimes(1);
    expect(query.data.value).toEqual(data);
  });

  it("error", async () => {
    const error = new CombinedError({ networkError: Error("something went wrong!") });
    const executeQuery = vi.fn(() => fromValue({ error }));
    const client = ref({ executeQuery });
    using res = useQueryFromClient(client as any);
    const { query } = res;
    expect(executeQuery).toBeCalledTimes(1);
    expect(query.error.value).toEqual(error);
  });

  it("data after fetching", async () => {
    const data: CtrlStateQuery = { ctrl: { state: "initialized" } };
    const subject: Subject<{ data?: CtrlStateQuery; error?: Error }> = makeSubject();
    const executeQuery = vi.fn(() => subject.source);
    const client = ref({ executeQuery });

    using res = useQueryFromClient(client as any);
    const { query } = res;

    expect(executeQuery).toBeCalledTimes(1);
    expect(query.fetching.value).toBe(true);

    setTimeout(() => {
      subject.next({ data });
    }, 0);

    await query;

    expect(executeQuery).toBeCalledTimes(1);
    expect(query.fetching.value).toBe(false);
    expect(query.data.value).toEqual(data);
  });

  it("error after fetching", async () => {
    const error = new CombinedError({ networkError: Error("something went wrong!") });
    const subject: Subject<{ data?: CtrlStateQuery; error?: Error }> = makeSubject();
    const executeQuery = vi.fn(() => subject.source);
    const client = ref({ executeQuery });

    using res = useQueryFromClient(client as any);
    const { query } = res;

    expect(executeQuery).toBeCalledTimes(1);
    expect(query.fetching.value).toBe(true);

    setTimeout(() => {
      subject.next({ error });
    }, 0);

    await query;

    expect(executeQuery).toBeCalledTimes(1);
    expect(query.fetching.value).toBe(false);
    expect(query.error.value).toEqual(error);
  });
});
