import { ref, computed, watchEffect, toValue } from "vue";
import type { MaybeRefOrGetter, UnwrapRef } from "vue";
import { useTheme } from "vuetify";
import type { ThemeDefinition } from "vuetify";
import type { OmitIndexSignature } from "type-fest";

import { useDynamicColors } from "@/utils/dynamic-color";
import { useDarkMode } from "./dark-mode";
import { useMonacoEditorTheme } from "./monaco-editor";

type DynamicColors = UnwrapRef<ReturnType<typeof useDynamicColors>["colors"]>;
type DynamicColorName = keyof DynamicColors;

type VuetifyColors = NonNullable<ThemeDefinition["colors"]>;
type RequiredVuetifyColors = OmitIndexSignature<Required<VuetifyColors>>;
type VuetifyColorName = keyof RequiredVuetifyColors;

type MissingColorName = Exclude<VuetifyColorName, DynamicColorName>;

function useSourceColor() {
  const sourceColor = ref("#607D8B"); // blue grey
  return { sourceColor };
}

export function useColorTheme() {
  // https://vuetifyjs.com/en/features/theme/
  const { isDark } = useDarkMode();
  const { sourceColor: sourceColorHex } = useSourceColor();

  const optionsLight = { sourceColorHex, dark: false };
  const optionsDark = { sourceColorHex, dark: true };

  const { colors: lightColors } = useDynamicColors(optionsLight);
  const { colors: darkColors } = useDynamicColors(optionsDark);

  useSetDynamicColors(lightColors, false);
  useSetDynamicColors(darkColors, true);

  const theme = useTheme();

  watchEffect(() => {
    theme.global.name.value = toValue(isDark) ? "dark" : "light";
  });

  useMonacoEditorTheme();
}

function useSetDynamicColors(
  dynamicColors: MaybeRefOrGetter<DynamicColors>,
  isDark: MaybeRefOrGetter<boolean>
) {
  const missing = computed(() => createMissingColors(toValue(dynamicColors)));
  const colors = computed(() => ({
    ...toValue(dynamicColors),
    ...toValue(missing),
  }));
  const { themes } = useTheme();
  const theme = computed(
    () => themes.value[toValue(isDark) ? "dark" : "light"]
  );

  watchEffect(() => {
    theme.value.colors = toValue(colors);
  });

  return theme;
}

function createMissingColors(dynamicColors: DynamicColors): {
  [K in MissingColorName]: string;
} {
  return {
    success: dynamicColors.primary,
    "on-success": dynamicColors["on-primary"],
    info: dynamicColors.secondary,
    "on-info": dynamicColors["on-secondary"],
    warning: dynamicColors.error,
    "on-warning": dynamicColors["on-error"],
  };
}
