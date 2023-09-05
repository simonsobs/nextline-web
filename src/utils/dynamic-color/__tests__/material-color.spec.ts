import { describe, it, expect } from "vitest";
import { ref, shallowRef } from "vue";
import { useDynamicColorsOld, useDynamicColorsHct, hctFromHex } from "..";

describe("useDynamicColors", () => {
  it("returns the correct colors", () => {
    const options = ref({
      sourceColor: "#2196F3",
      dark: false,
      contrastLevel: 0.0,
    });
    const { colors } = useDynamicColorsOld(options);
    expect(colors.value).toHaveProperty("primary");
    expect(colors.value).toMatchSnapshot();
  });
});

describe("useDynamicColorsHct", () => {
  it("returns the correct colors", () => {
    const options = shallowRef({
      sourceColorHct: hctFromHex("#2196F3"),
      dark: false,
      contrastLevel: 0.0,
    });
    const { colorsHct } = useDynamicColorsHct(options);
    expect(colorsHct.value).toHaveProperty("primary");
    expect(colorsHct.value).toMatchSnapshot();
  });
});
