import { createApp, defineComponent, inject, provide } from "vue";

import { AppDisposer } from "@/tests/vue";

type SetupFunction = () => Record<string, unknown>;

/**
 * Options for setting up nested components.
 */
export interface SetupNestedComponentsOptions {
  /** Setup function for the parent component */
  setupParent: SetupFunction;
  /** Setup function for the child component */
  setupChild: SetupFunction;
}

/**
 * Sets up a Vue application with nested parent and child components.
 *
 * This function creates a Vue application with a parent component that includes
 * a child component. Both components are configured using the provided setup functions.
 * The resulting app is mounted to a new div element and wrapped in an AppDisposer
 * for proper cleanup.
 *
 * @param options - Configuration options for the parent and child components
 * @returns An object containing the Vue app instance and a Symbol.dispose method
 *
 * @example
 * ```
 * const { app } = setupNestedComponents({
 *   setupParent: () => ({ parentData: ref('Parent') }),
 *   setupChild: () => ({ childData: ref('Child') })
 * });
 * ```
 */
export function setupNestedComponents(options: SetupNestedComponentsOptions) {
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
  const disposable = new AppDisposer(app);
  return { app, [Symbol.dispose]: () => disposable[Symbol.dispose]() };
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("setupNestedComponents", () => {
    const key = Symbol();
    const provided = {}; // a sentinel
    let injected: object | undefined;

    using _ = setupNestedComponents({
      setupParent: () => {
        provide(key, provided);
        return {};
      },
      setupChild: () => {
        injected = inject(key);
        return {};
      },
    });

    expect(injected).toBe(provided);
  });
}
