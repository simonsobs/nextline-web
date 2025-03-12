import { describe, it, expect } from "vitest";

import { useDarkMode } from "../dark-mode";

describe("toggleDark", () => {
  it("should change isDark", () => {
    const { isDark, toggleDark } = useDarkMode();
    isDark.value = false;
    toggleDark();
    expect(isDark.value).toBe(true);
  });
});
