import { ref, computed, watchEffect, toValue } from "vue";
import type { MaybeRefOrGetter } from "vue";
import { useTheme } from "vuetify";
import { hexFromArgb } from "@material/material-color-utilities";

import { useDynamicTheme } from "./material-color";
import { useDarkMode } from "./dark-mode";
import { useMonacoEditorTheme } from "./monaco-editor";

export function useColorTheme() {
  useDarkMode();
  const { sourceColor } = useSourceColor();
  const { theme: light } = useGenerated(sourceColor, false);
  const { theme: dark } = useGenerated(sourceColor, true);

  const theme = useTheme();
  watchEffect(() => {
    // @ts-ignore
    theme.themes.value.light.colors = toValue(light).colors;
  });

  watchEffect(() => {
    // @ts-ignore
    theme.themes.value.dark.colors = toValue(dark).colors;
  });

  useMonacoEditorTheme();
}

function useSourceColor() {
  const sourceColor = ref("#607D8B"); // blue grey
  return { sourceColor };
}

function useGenerated(
  sourceColor: MaybeRefOrGetter<string>,
  dark: MaybeRefOrGetter<boolean>
) {
  const { theme: dynamic } = useDynamicTheme(sourceColor, dark);
  const theme = computed(() => dynamicThemeToVuetifyTheme(toValue(dynamic)));
  return { theme };
}

const dynamicThemeToVuetifyTheme = (theme: {
  dark: boolean;
  colors: Record<string, number>;
}) => ({
  dark: theme.dark,
  colors: dynamicColorsToVuetifyColors(theme.colors),
});

const dynamicColorsToVuetifyColors = (colors: Record<string, number>) =>
  Object.fromEntries(
    Object.entries(colors).map(([key, value]) => [
      key.replace(/_/g, "-"),
      hexFromArgb(value),
    ])
  );
