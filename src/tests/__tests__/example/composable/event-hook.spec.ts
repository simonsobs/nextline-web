import { describe, it, expect } from "vitest";
import { ref } from "vue";
import { createEventHook } from '@vueuse/core'

function useFoo() {
  const foo = ref(0);
  const change = createEventHook<number>();
  const increment = () => {
    foo.value++;
	change.trigger(foo.value);
  };
  return {
    foo,
    increment,
    onFooChange: change.on,
  };
}

describe("useFoo()", () => {
  it("should be reactive", () => {
    const { foo, increment } = useFoo();
    expect(foo.value).toBe(0);
    increment();
    expect(foo.value).toBe(1);
  });

  it("should be reactive to onFooChange()", () => {
    const { foo, increment, onFooChange } = useFoo();
    expect(foo.value).toBe(0);
    let newVal = 0;
    onFooChange((newVal_) => {
      newVal = newVal_;
    });
    increment();
    expect(foo.value).toBe(1);
    expect(newVal).toBe(1);
    increment();
    expect(foo.value).toBe(2);
    expect(newVal).toBe(2);
  });
});
