/**
 * The code to generate Dynamic Color of Material Design:
 * https://m3.material.io/styles/color/dynamic-color/
 *
 * It uses material-color-utilities:
 * https://github.com/material-foundation/material-color-utilities
 *
 * The code was originally based on dynamic_color_test.ts:
 * https://github.com/material-foundation/material-color-utilities/blob/ce99247b6ba/typescript/dynamiccolor/dynamic_color_test.ts
 *
 * This issue has a link to the above file:
 * https://github.com/material-foundation/material-color-utilities/issues/98
 *
 * This YouTube video explains the dynamic scheme:
 * https://youtu.be/vnDhq8W98O4?t=648
 *
 * This blog post explains the surface colors:
 * https://material.io/blog/tone-based-surface-color-m3
 *
 */

import { computed } from "vue";
import type { UnwrapRef } from "vue";
import { hexFromArgb } from "@material/material-color-utilities";
import type { DynamicScheme } from "@material/material-color-utilities";

import { ColorNameMap } from "./colors";
import type { ColorName } from "./colors";
import { useDynamicScheme } from "./dynamic-scheme";
import type { UseDynamicSchemeOptions } from "./dynamic-scheme";

export interface UseDynamicColorsOptions extends UseDynamicSchemeOptions {}

export function useDynamicColors(options?: UseDynamicColorsOptions) {
  const { scheme, ...rest } = useDynamicScheme(options);
  const colors = computed(() => generateColors(scheme.value));
  return { colors, scheme, ...rest };
}

export type UseDynamicColorsReturn = ReturnType<typeof useDynamicColors>;
export type DynamicColors = UnwrapRef<UseDynamicColorsReturn["colors"]>;

const generateColors = (scheme: DynamicScheme) =>
  Object.assign(
    {},
    ...Object.entries(ColorNameMap).map(([colorName, dynamicColor]) => ({
      [colorName]: hexFromArgb(dynamicColor.getArgb(scheme)),
    })),
  ) as { [k in ColorName]: string };
