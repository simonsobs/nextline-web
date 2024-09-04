import type { Client, ClientHandle } from "@urql/vue";
import { provideClient, useClientHandle } from "@urql/vue";
import type { MaybeRef } from "vue";

import { setupNestedComponents } from "./setup-nested-components";

/**
 * Execute the function `setup` in a context where the urql client can be injected.
 *
 * @param setup - Function to be executed
 * @param client - The urql client to be provided
 * @returns A disposable that can be used with `using`
 */
export function urqlClientProvidedSetup(setup: () => void, client: MaybeRef<Client>) {
  const disposable = setupNestedComponents({
    setupParent() {
      provideClient(client);
      return {};
    },
    setupChild() {
      setup();
      return {};
    },
  });
  return { [Symbol.dispose]: () => disposable[Symbol.dispose]() };
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("urqlClientProvidedSetup", () => {
    const mockClient = {} as Client;
    let handle!: ClientHandle;

    using _ = urqlClientProvidedSetup(() => {
      handle = useClientHandle();
    }, mockClient);

    expect(handle.client).toBe(mockClient);
  });
}
