// Test composables with lifecycle hooks and provide/inject
// https://vuejs.org/guide/scaling-up/testing.html#testing-composables

import { describe, it, expect } from "vitest";
import { createApp, ref, onMounted } from "vue";

export function withSetup(setup: () => void) {
  const app = createApp({
    setup() {
      setup();
      return () => {};
    },
  });
  app.mount(document.createElement("div"));
  return app;
}

function useFoo(ini: number) {
  const foo = ref(0);
  onMounted(() => {
    foo.value = ini;
  });
  return { foo };
}

describe("useFoo", () => {
  it("onMounted() and provide()", () => {
    let result!: ReturnType<typeof useFoo>;
    const app = withSetup(() => {
      result = useFoo(123);
    });
    expect(result.foo.value).toBe(123);
    app.provide("foo", result.foo);
    app.unmount();
  });
});
