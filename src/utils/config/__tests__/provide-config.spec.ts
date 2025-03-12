import { describe, expect, it } from "vitest";
import type { App, Ref } from "vue";
import { createApp, defineComponent, inject, nextTick, shallowRef, watch } from "vue";

import { injectionKey } from "../key";
import { useProvideConfigT } from "../provide-config";

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

function withSetups(options: WitSetupsOptions): DisposableApp {
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
  return new DisposableApp(app);
}

describe("useProvideConfigT", () => {
  it("provides and updates config reactively when given a ShallowRef", async () => {
    const config = shallowRef({ key: "initial" });
    let injectedConfig: Ref<{ key: string }> | undefined;

    using _ = withSetups({
      setupParent() {
        useProvideConfigT(config);
        return {};
      },
      setupChild() {
        injectedConfig = inject(injectionKey);
        return {};
      },
    });

    await nextTick();
    expect(injectedConfig?.value).toEqual({ key: "initial" });

    config.value = { key: "updated" };
    await nextTick();
    expect(injectedConfig?.value).toEqual({ key: "updated" });

    config.value = { key: "final" };
    await nextTick();
    expect(injectedConfig?.value).toEqual({ key: "final" });
  });

  it("works with non-ref values", async () => {
    let injectedConfig: Ref<{ key: string }> | undefined;

    using _ = withSetups({
      setupParent() {
        useProvideConfigT({ key: "static" });
        return {};
      },
      setupChild() {
        injectedConfig = inject(injectionKey);
        return {};
      },
    });

    await nextTick();
    expect(injectedConfig?.value).toEqual({ key: "static" });
  });

  it("returns the provided ShallowRef", () => {
    let returnedConfig: Ref<{ key: string }> | undefined;

    using _ = withSetups({
      setupParent() {
        const result = useProvideConfigT({ key: "test" });
        returnedConfig = result.config;
        return {};
      },
      setupChild() {
        return {};
      },
    });

    expect(returnedConfig?.value).toEqual({ key: "test" });
  });

  it("maintains shallow reactivity", async () => {
    const config = shallowRef({ nested: { value: "initial" } });
    let injectedConfig: Ref<{ nested: { value: string } }> | undefined;
    let watchCount = 0;

    using _ = withSetups({
      setupParent() {
        useProvideConfigT(config);
        return {};
      },
      setupChild() {
        injectedConfig = inject(injectionKey);
        watch(
          () => injectedConfig?.value,
          () => {
            watchCount++;
          },
          { deep: true },
        );
        return {};
      },
    });

    await nextTick();
    expect(injectedConfig?.value.nested.value).toBe("initial");

    config.value.nested.value = "updated";
    await nextTick();
    expect(injectedConfig?.value.nested.value).toBe("updated");
    expect(watchCount).toBe(0); // Should not trigger watch due to shallow reactivity

    config.value = { nested: { value: "new object" } };
    await nextTick();
    expect(injectedConfig?.value.nested.value).toBe("new object");
    expect(watchCount).toBe(1); // Should trigger watch
  });
});
