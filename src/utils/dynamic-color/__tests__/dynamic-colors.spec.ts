import { describe, it, expect } from "vitest";
import { useDynamicColors } from "..";

describe("useDynamicColors", () => {
  it("returns colors", () => {
    const { colors } = useDynamicColors();
    expect(colors.value).toMatchSnapshot();
  });

  it("colors are reactive", () => {
    const { colors, sourceColorHex } = useDynamicColors({
      sourceColorHex: "#F44336",
    });
    const colors1 = colors.value;
    sourceColorHex.value = "#673AB7";
    const colors2 = colors.value;
    expect(colors1).not.toEqual(colors2);
  });
});
