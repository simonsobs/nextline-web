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
  const source = computed(() => unref(sourceColorHex) || DEFAULT_SOURCE_COLOR_HEX);

  const optionsLight = { sourceColorHex: source, dark: false };
  const optionsDark = { sourceColorHex: source, dark: true };

  const { colors: lightColors } = useDynamicColors(optionsLight);
  const { colors: darkColors } = useDynamicColors(optionsDark);

  useDynamicColorsOnVuetify(lightColors, false);
  useDynamicColorsOnVuetify(darkColors, true);

  useDynamicColorsOnMonacoEditor(lightColors, false);
  useDynamicColorsOnMonacoEditor(darkColors, true);

  useDarkModeOnVuetify();
  useDarkModeOnMonacoEditor();
}
