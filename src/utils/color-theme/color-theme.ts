import { ref, computed, watchEffect } from "vue";
import * as monaco from "monaco-editor";

import { useDynamicColors } from "@/utils/dynamic-color";
import { useDarkMode } from "./dark-mode";
import { useMonacoEditorTheme } from "./monaco-editor";
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

  useDarkModeOnVuetify();
  useMonacoEditorTheme();
  useDarkModeOnMonacoEditor();
}

function useDarkModeOnMonacoEditor() {
  // Note: All instances of Monaco Editor share the same theme.
  //       It is not possible to have different themes for different instances.
  //       https://github.com/Microsoft/monaco-editor/issues/338
  const { isDark } = useDarkMode();
  const themeName = computed(() =>
    isDark.value ? "nextline-dark" : "nextline-light"
  );
  watchEffect(() => {
    monaco.editor.setTheme(themeName.value);
  });
}
