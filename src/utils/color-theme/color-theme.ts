import { ref, computed, watchEffect, toValue } from "vue";
import type { MaybeRefOrGetter } from "vue";
import { useTheme } from "vuetify";

import { generate } from "./material-color";
import { useDarkMode } from "./dark-mode";
import { useMonacoEditorTheme } from "./monaco-editor";

export function useColorTheme() {
  useDarkMode();
  const { sourceColor } = useSourceColor();
  const theme = useTheme();
  const { light, dark } = useGenerated(sourceColor);
  watchEffect(() => {
    // @ts-ignore
    theme.themes.value.light.colors = toValue(light).colors;

    // @ts-ignore
    theme.themes.value.dark.colors = toValue(dark).colors;
  });
  useMonacoEditorTheme();
}

function useSourceColor() {
  const sourceColor = ref("#607D8B"); // blue grey
  return { sourceColor };
}

function useGenerated(sourceColor: MaybeRefOrGetter<string>) {
  const generated = computed(() => generate(toValue(sourceColor)));
  const light = computed(() => generated.value.light);
  const dark = computed(() => generated.value.dark);
  return { light, dark };
}
