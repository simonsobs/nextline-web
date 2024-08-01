import { ref } from "vue";
import type { MaybeRef } from "vue";

import { useDynamicColors } from "@/utils/dynamic-color";
import {
  useDynamicColorsOnMonacoEditor,
  useDarkModeOnMonacoEditor,
} from "./monaco-editor";
import { useDynamicColorsOnVuetify, useDarkModeOnVuetify } from "./vuetify";

const DEFAULT_SOURCE_COLOR_HEX = "#607D8B"; // blue grey
// const DEFAULT_SOURCE_COLOR_HEX = "#E91E63"; // pink

export function useColorTheme(sourceColorHex?: MaybeRef<string>) {
  sourceColorHex = ref(sourceColorHex ?? DEFAULT_SOURCE_COLOR_HEX);

  const optionsLight = { sourceColorHex, dark: false };
  const optionsDark = { sourceColorHex, dark: true };

  const { colors: lightColors } = useDynamicColors(optionsLight);
  const { colors: darkColors } = useDynamicColors(optionsDark);

  useDynamicColorsOnVuetify(lightColors, false);
  useDynamicColorsOnVuetify(darkColors, true);

  useDynamicColorsOnMonacoEditor(lightColors, false);
  useDynamicColorsOnMonacoEditor(darkColors, true);

  useDarkModeOnVuetify();
  useDarkModeOnMonacoEditor();
}
