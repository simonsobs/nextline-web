import { ref, computed, watchEffect, toValue } from "vue";
import type { MaybeRefOrGetter } from "vue";
import { useTheme } from "vuetify";
import { hexFromArgb } from "@material/material-color-utilities";

import { useDynamicColors } from "./material-color";
import { useDarkMode } from "./dark-mode";
import { useMonacoEditorTheme } from "./monaco-editor";

export function useColorTheme() {
  // https://vuetifyjs.com/en/features/theme/
  const { isDark } = useDarkMode();
  const { sourceColor } = useSourceColor();

  const { colors: lightColors } = useDynamicColors(sourceColor, false);
  const { colors: darkColors } = useDynamicColors(sourceColor, true);

  useVuetifyTheme(lightColors, false);
  useVuetifyTheme(darkColors, true);

  const theme = useTheme();

  watchEffect(() => {
    theme.global.name.value = toValue(isDark) ? "dark" : "light";
  });

  useMonacoEditorTheme();
}

function useVuetifyTheme(
  dynamicColors: MaybeRefOrGetter<Record<string, number>>,
  isDark: MaybeRefOrGetter<boolean>
) {
  const colors = computed(() => toVuetifyColors(toValue(dynamicColors)));
  const { themes } = useTheme();
  const theme = computed(
    () => themes.value[toValue(isDark) ? "dark" : "light"]
  );

  watchEffect(() => {
    // @ts-ignore
    theme.value.colors = toValue(colors);
  });

  return theme;
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
