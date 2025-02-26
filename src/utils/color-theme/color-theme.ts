import type { MaybeRef } from "vue";

import type { ColorTheme } from "./create";
import { createColorTheme } from "./create";
import {
  useDarkModeOnMonacoEditor,
  useDynamicColorsOnMonacoEditor,
} from "./monaco-editor";
import { useDarkModeOnVuetify, useDynamicColorsOnVuetify } from "./vuetify";

export function useColorTheme(sourceColorHex?: MaybeRef<string | undefined>) {
  const colorTheme = createColorTheme(sourceColorHex);
  useColorThemeOnVuetify(colorTheme);
  useColorThemeOnMonacoEditor(colorTheme);
}

export function useColorThemeOnVuetify(colorTheme: ColorTheme) {
  useDynamicColorsOnVuetify(colorTheme.light, false);
  useDynamicColorsOnVuetify(colorTheme.dark, true);
  useDarkModeOnVuetify();
}

export function useColorThemeOnMonacoEditor(colorTheme: ColorTheme) {
  useDynamicColorsOnMonacoEditor(colorTheme.light, false);
  useDynamicColorsOnMonacoEditor(colorTheme.dark, true);
  useDarkModeOnMonacoEditor();
}
