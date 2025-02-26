import type { MaybeRef } from "vue";
import { computed, unref } from "vue";

import { useDynamicColors } from "@/utils/dynamic-color";

const DEFAULT_SOURCE_COLOR_HEX = "#607D8B"; // blue grey
// const DEFAULT_SOURCE_COLOR_HEX = "#E91E63"; // pink


export function createColorTheme(sourceColorHex?: MaybeRef<string | undefined>) {
  const source = computed(() => unref(sourceColorHex) || DEFAULT_SOURCE_COLOR_HEX);

  const optionsLight = { sourceColorHex: source, dark: false };
  const optionsDark = { sourceColorHex: source, dark: true };

  const { colors: light } = useDynamicColors(optionsLight);
  const { colors: dark } = useDynamicColors(optionsDark);

  return { light, dark };
}

export type ColorTheme = ReturnType<typeof createColorTheme>;
