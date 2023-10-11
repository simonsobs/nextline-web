import { describe, it, expect } from "vitest";
import { ref, onMounted } from "vue";

import { withSetup } from "../with-setup";

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
