import { describe, it, expect } from "vitest";
import { ref } from "vue";
import { useDynamicColors } from "..";

describe("useDynamicColors", () => {
  it("returns the correct colors", () => {
    const options = ref({ sourceColor: "#2196F3", dark: false, contrastLevel: 0.0 });
    const { colors } = useDynamicColors(options);
    expect(colors.value).toHaveProperty("primary");
    expect(colors.value).toMatchSnapshot();
  });
});
