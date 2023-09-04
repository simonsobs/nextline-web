import { describe, it, expect } from "vitest";
import { ref } from "vue";
import { useDynamicColors } from "..";

describe("useDynamicColors", () => {
  it("returns the correct colors", () => {
    const sourceColor = ref("#2196f3");
    const dark = ref(false);
    const contrastLevel = ref(0.0);
    const options = ref({ dark, contrastLevel });
    const { colors } = useDynamicColors(sourceColor, options);
    expect(colors.value).toHaveProperty("primary");
  });
});
