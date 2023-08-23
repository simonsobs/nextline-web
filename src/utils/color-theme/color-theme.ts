import { ref, computed, watchEffect, toValue } from "vue";
import { useTheme } from "vuetify";
import { hexFromArgb } from "@material/material-color-utilities";

import { useDynamicColors } from "./material-color";
import { useDarkMode } from "./dark-mode";
import { useMonacoEditorTheme } from "./monaco-editor";

export function useColorTheme() {
  useDarkMode();
  const { sourceColor } = useSourceColor();

  const lightColors = useDynamicColors(sourceColor, false);
  const darkColors = useDynamicColors(sourceColor, true);

  const light = computed(() => toVuetifyColors(toValue(lightColors)));
  const dark = computed(() => toVuetifyColors(toValue(darkColors)));

  const theme = useTheme();
  watchEffect(() => {
    // @ts-ignore
    theme.themes.value.light.colors = toValue(light);
  });

  watchEffect(() => {
    // @ts-ignore
    theme.themes.value.dark.colors = toValue(dark);
  });

  useMonacoEditorTheme();
}

function useSourceColor() {
  const sourceColor = ref("#607D8B"); // blue grey
  return { sourceColor };
}

const toVuetifyColors = (colors: Record<string, number>) =>
  Object.fromEntries(
    Object.entries(colors).map(([key, value]) => [
      key.replace(/_/g, "-"),
      hexFromArgb(value),
    ])
  );
