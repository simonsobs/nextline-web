import { ref, watchEffect, toValue } from "vue";
import { useTheme } from "vuetify";

import { generate } from "./material-color";
import { useDarkMode } from "./dark-mode";
import { useMonacoEditorTheme } from "./monaco-editor";

export function useColorTheme() {
  useDarkMode();
  const { sourceColor } = useSourceColor();
  const theme = useTheme();
  watchEffect(() => {
    const { light, dark } = generate(toValue(sourceColor));

    // @ts-ignore
    theme.themes.value.light.colors = light.colors;

    // @ts-ignore
    theme.themes.value.dark.colors = dark.colors;
  });
  useMonacoEditorTheme();
}

function useSourceColor() {
  const sourceColor = ref("#607D8B"); // blue grey
  return { sourceColor };
}
