import { describe, it, expect } from "vitest";
import {
  h,
  ref,
  defineComponent,
  onMounted,
  provide,
  inject,
  getCurrentInstance,
} from "vue";
import type { InjectionKey, Ref } from "vue";

import { withAsyncSetup } from "../with-async-setup";

describe("withAsyncSetup", () => {
  it("should use render function from setup", async () => {
    const setup = () => () => h("div", "abc");
    const { wrapper } = await withAsyncSetup(setup);
    expect(wrapper.text()).toBe("abc");
  });

  it("should use render function from async setup", async () => {
    const setup = async () => () => h("div", "abc");
    const { wrapper } = await withAsyncSetup(setup);
    expect(wrapper.text()).toBe("abc");
  });

  it("should render <template> for setup => void", async () => {
    const setup = () => {};
    const { wrapper } = await withAsyncSetup(setup);
    expect(wrapper.html()).toBe("<template></template>");
  });

  it("should render <template> for async setup => void", async () => {
    const setup = async () => {};
    const { wrapper } = await withAsyncSetup(setup);
    expect(wrapper.html()).toBe("<template></template>");
  });

  it("should call lifecycle hooks", async () => {
    const setup = async () => {
      const foo = ref(0);
      onMounted(() => {
        foo.value = 123;
      });
      return () => h("div", foo.value);
    };
    const { wrapper } = await withAsyncSetup(setup);
    expect(wrapper.text()).toBe("123");
  });

  it("should inject provided values", async () => {
    const key = Symbol() as InjectionKey<Ref<number>>;
    const ChildComponent = defineComponent({
      setup() {
        const foo = inject(key);
        return () => h("div", foo?.value);
      },
    });
    const setup = async () => {
      const foo = ref(0);
      provide(key, foo);
      // Note: provide() must be before the first await
      onMounted(() => {
        foo.value = 123;
      });
      return () => h(ChildComponent, null, {});
    };
    const { wrapper } = await withAsyncSetup(setup);
    expect(wrapper.text()).toBe("123");
  });

  it("the current instance might be null after await", async () => {
    let beforeAwait!: any;
    let afterAwait!: any;
    const setup = async () => {
      beforeAwait = getCurrentInstance();
      await new Promise((resolve) => setTimeout(resolve, 100));
      afterAwait = getCurrentInstance();
    };
    await withAsyncSetup(setup);
    expect(beforeAwait).toBeTruthy();
    // console.log(afterAwait); // this can be null

    // When the current instance is null, it is considered outside of the
    // setup() function. As a result, it is not possible to use functions that
    // need to be called inside the setup() function (e.g. provide()).
    // Those functions need to be called before the first await.
  });
});
