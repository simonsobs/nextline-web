import type { Client } from "@urql/vue";
import { provideClient, useClientHandle } from "@urql/vue";
import type { MaybeRef } from "vue";

import { setupNestedComponents } from "./setup-nested-components";


/**
 * Execute `func` in a Vue component `setup` in which the `client` can be injected.
 *
 * @param func - Function to be executed
 * @param client - The urql client to be provided
 * @returns A disposable object containing the `func`'s return 
 */
export function useInSetupWithUrqlClient<T>(func: () => T, client: MaybeRef<Client>) {
  let ret!: T;
  const disposable = setupNestedComponents({
    setupParent() {
      provideClient(client);
      return {};
    },
    setupChild() {
      ret = func();
      return {};
    },
  });
  return { ret, [Symbol.dispose]: () => disposable[Symbol.dispose]() };
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it.skip("useInSetupWithUrqlClient", () => {
    const mockClient = {} as Client;

    using ret = useInSetupWithUrqlClient(() => useClientHandle(), mockClient);
    const { ret: handle } = ret;

    expect(handle.client).toBe(mockClient);
  });
}
