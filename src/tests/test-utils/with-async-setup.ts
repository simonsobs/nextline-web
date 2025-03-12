import { h, ref, defineComponent, Suspense, nextTick } from "vue";
import type { RenderFunction } from "vue";
import { mount, flushPromises } from "@vue/test-utils";
import { until } from "@vueuse/core";

// https://stackoverflow.com/questions/65654965/what-is-the-proper-way-to-test-vue3-async-setup-component-with-suspense
// https://github.com/vuejs/test-utils/blob/main/tests/features/suspense.spec.ts

export async function withAsyncSetup(
  setup: () => RenderFunction | void | Promise<RenderFunction | void>,
) {
  const finish = ref(false);
  const AsyncComponent = defineComponent({
    setup: async () => {
      const renderFunc = await setup();
      finish.value = true;
      return renderFunc ?? (() => h("template"));
    },
  });

  const SuspenseApp = defineComponent({
    setup() {
      // Equivalent to <suspense><async-component></async-component></suspense>
      return () => h(Suspense, null, { default: h(AsyncComponent, null, {}) });
    },
  });

  const wrapper = mount(SuspenseApp);
  await until(finish).toBeTruthy();
  await nextTick();
  await nextTick();
  await flushPromises(); // might be unnecessary
  return { wrapper };
}
