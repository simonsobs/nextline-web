import { inject } from "vue";

import { injectionKeyColorTheme } from "./key";
import { createColorTheme } from "./create";
import { useDarkModeOnVuetify, useDynamicColorsOnVuetify } from "./vuetify";

const DEFAULT_COLOR_THEME = createColorTheme();

export function useColorTheme() {
  const colorTheme = inject(injectionKeyColorTheme, DEFAULT_COLOR_THEME);
  return colorTheme;
}

export function useColorThemeOnVuetify() {
  const colorTheme = useColorTheme();
  useDynamicColorsOnVuetify(colorTheme.light, false);
  useDynamicColorsOnVuetify(colorTheme.dark, true);
  useDarkModeOnVuetify();
}
