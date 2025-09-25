import { describe, it, expect, vi } from "vitest";
import { ref } from "vue";
import { mount } from "@vue/test-utils";
import fc from "fast-check";

import { fcError, fcUndefinedOr } from "@/graphql/tests/arbitraries";
import { onReady } from "@/utils/on-ready";

import AutoModeButton from "../AutoModeButton.vue";
import { useAutoMode } from "../use-auto-mode";

vi.mock("../use-auto-mode", () => ({ useAutoMode: vi.fn() }));

const fcReturns = () =>
  fc
    .record({
      autoMode: fcUndefinedOr(fc.boolean()).map((v) => ref(v)),
      pulling: fc.constant(ref(false)),
      loading: fc.boolean().map((v) => ref(v)),
      error: fcUndefinedOr(fcError).map((v) => ref(v)),
    })
    .map((ret) => onReady(ret, Promise.resolve()));

describe("AutoModeButton", () => {
  it("Property test", () => {
    fc.assert(
      fc.property(fcReturns(), (ret) => {
        vi.mocked(useAutoMode).mockReturnValue(ret);
        const wrapper = mount(AutoModeButton, {
          global: {
            stubs: {
              ButtonOff: true,
              ButtonAutoMode: true,
              ButtonError: true,
            },
          },
        });

        if (ret.loading.value) {
          const button = wrapper.findComponent({ name: "VBtn" });
          expect(button.exists()).toBe(true);
          expect(button.props()["loading"]).toBe(true);
        } else if (ret.error.value) {
          const button = wrapper.findComponent({ name: "ButtonError" });
          expect(button.exists()).toBe(true);
          expect(button.props("error")).toEqual(ret.error.value);
        } else if (ret.autoMode.value === true) {
          expect(wrapper.findComponent({ name: "ButtonAutoMode" }).exists()).toBe(true);
        } else if (ret.autoMode.value === false) {
          expect(wrapper.findComponent({ name: "ButtonOff" }).exists()).toBe(true);
        } else {
          expect(wrapper.html()).toContain("Unknown");
        }
        wrapper.unmount();
      }),
    );
  });
});
