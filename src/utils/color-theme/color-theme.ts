import { ref } from "vue";

import { useDynamicColors } from "@/utils/dynamic-color";
import {
  useDynamicColorsOnMonacoEditor,
  useDarkModeOnMonacoEditor,
} from "./monaco-editor";
import { useDynamicColorsOnVuetify, useDarkModeOnVuetify } from "./vuetify";

function useSourceColor() {
  const sourceColor = ref("#607D8B"); // blue grey
  // const sourceColor = ref("#E91E63"); // pink
  return { sourceColor };
}

export function useColorTheme() {
  const { sourceColor: sourceColorHex } = useSourceColor();

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
