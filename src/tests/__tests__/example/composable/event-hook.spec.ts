import { describe, it, expect } from "vitest";
import { ref } from "vue";

function useFoo() {
  const foo = ref(0);
  const hooks: ((newVal: number) => void)[] = [];
  const increment = () => {
    foo.value++;
    hooks.forEach((hook) => hook(foo.value));
  };
  const onFooChange = (hook: (newVal: number) => void) => {
    hooks.push(hook);
    const stop = () => {
      const index = hooks.indexOf(hook);
      if (index === -1) return;
      hooks.splice(index, 1);
    };
    return stop;
  };
  return {
    foo,
    increment,
    onFooChange,
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
    const stop = onFooChange((newVal_) => {
      newVal = newVal_;
    });
    increment();
    expect(foo.value).toBe(1);
    expect(newVal).toBe(1);
    stop();
    increment();
    expect(foo.value).toBe(2);
    expect(newVal).toBe(1);
  });
});
