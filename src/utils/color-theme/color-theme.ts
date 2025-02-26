import type { MaybeRef } from "vue";
import { computed, unref } from "vue";

import { useDynamicColors } from "@/utils/dynamic-color";
import {
  useDarkModeOnMonacoEditor,
  useDynamicColorsOnMonacoEditor,
} from "./monaco-editor";
import { useDarkModeOnVuetify, useDynamicColorsOnVuetify } from "./vuetify";

const DEFAULT_SOURCE_COLOR_HEX = "#607D8B"; // blue grey
// const DEFAULT_SOURCE_COLOR_HEX = "#E91E63"; // pink

export function useColorTheme(sourceColorHex?: MaybeRef<string | undefined>) {
  const colorTheme = createColorTheme(sourceColorHex);
  useColorThemeOnVuetify(colorTheme);
  useColorThemeOnMonacoEditor(colorTheme);
}

export function createColorTheme(sourceColorHex?: MaybeRef<string | undefined>) {
  const source = computed(() => unref(sourceColorHex) || DEFAULT_SOURCE_COLOR_HEX);

  const optionsLight = { sourceColorHex: source, dark: false };
  const optionsDark = { sourceColorHex: source, dark: true };

  const { colors: light } = useDynamicColors(optionsLight);
  const { colors: dark } = useDynamicColors(optionsDark);

  return { light, dark };
}

export type ColorTheme = ReturnType<typeof createColorTheme>;

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
