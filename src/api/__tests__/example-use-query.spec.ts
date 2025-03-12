import { describe, expect, it } from "vitest";
import type { App, MaybeRef } from "vue";
import { createApp, defineComponent, ref } from "vue";
import { Client, CombinedError, provideClient, useQuery } from "@urql/vue";
import gql from "graphql-tag";
import { fromValue, never } from "wonka";

type SetupFunction = () => Record<string, unknown>;

interface WitSetupsOptions {
  setupParent: SetupFunction;
  setupChild: SetupFunction;
}

class DisposableApp implements Disposable {
  constructor(private app: App) {}

  [Symbol.dispose]() {
    this.app.unmount();
  }
}

function withSetups(options: WitSetupsOptions) {
  const ParentComponent = defineComponent({
    setup: options.setupParent,
    template: "<child-component />",
  });

  const ChildComponent = defineComponent({
    setup: options.setupChild,
    template: "<template />",
  });

  const app = createApp(ParentComponent);
  app.component("ChildComponent", ChildComponent);
  app.mount(document.createElement("div"));
  const disposable = new DisposableApp(app);
  return { app, [Symbol.dispose]: () => disposable[Symbol.dispose]() };
}

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
  let query: ReturnType<typeof useQuery<FooQuery>> | undefined;
  const app = withSetups({
    setupParent() {
      provideClient(client);
      return {};
    },
    setupChild() {
      query = useQuery<FooQuery>({ query: FooDocument });
      return {};
    },
  });
  if (!query) throw new Error("query is undefined");
  return { ...app, query, [Symbol.dispose]: () => app[Symbol.dispose]() };
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
