import { describe, it, expect } from "vitest";
import { useDynamicColors } from "..";

describe("useDynamicColors", () => {
  it("returns scheme", () => {
    const { colors } = useDynamicColors();
	expect(colors.value).toMatchSnapshot();
  });
});
