import { describe, expect, it } from "vitest";
import type { MaybeRef } from "vue";
import { ref } from "vue";
import { Client, CombinedError, useQuery } from "@urql/vue";
import gql from "graphql-tag";
import { fromValue, never } from "wonka";

import { useInSetupWithUrqlClient } from "@/graphql/tests";

export const FooDocument = gql`
  query foo {
    foo
  }
`;

export type FooQuery = {
  __typename?: "Query";
  foo?: string | null;
};

function useQueryFromClient(client: MaybeRef<Client>) {
  const { ret: query, [Symbol.dispose]: dispose } = useInSetupWithUrqlClient(
    () => useQuery<FooQuery>({ query: FooDocument }),
    client,
  );
  return { query, [Symbol.dispose]: () => dispose() };
}

describe("one", () => {
  it("fetching", () => {
    const executeQuery = () => never; // fetching
    const client = ref({ executeQuery });
    using res = useQueryFromClient(client as any);
    const { query } = res;
    expect(query.fetching.value).toBe(true);
  });

  it("data", () => {
    const executeQuery = () => fromValue({ data: { foo: "bar" } });
    const client = ref({ executeQuery });
    using res = useQueryFromClient(client as any);
    const { query } = res;
    expect(query.fetching.value).toBe(false);
    expect(query.data.value?.foo).toBe("bar");
  });

  it("error", () => {
    const executeQuery = () =>
      fromValue({
        error: new CombinedError({ networkError: new Error("baz") }),
      });
    const client = ref({ executeQuery });
    using res = useQueryFromClient(client as any);
    const { query } = res;
    expect(query.error.value?.message).toEqual(expect.stringContaining("baz"));
  });

  it("example - reactive", async () => {
    const executeQuery = () => never; // fetching
    const client = ref({ executeQuery });
    using res = useQueryFromClient(client as any);
    const { query } = res;

    // fetching initially
    expect(query.fetching.value).toBe(true);

    // provide data
    client.value.executeQuery = () => fromValue({ data: { foo: "bar" } });

    await query;

    // not fetching anymore, data is available
    expect(query.fetching.value).toBe(false);
    expect(query.data.value?.foo).toBe("bar");
  });
});
