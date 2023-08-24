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

import { computed, toValue } from "vue";
import type { MaybeRefOrGetter } from "vue";
import {
  argbFromHex,
  MaterialDynamicColors,
  SchemeFidelity,
  Hct,
  DynamicColor,
} from "@material/material-color-utilities";
import type { DynamicScheme } from "@material/material-color-utilities";
import type { SnakeCase } from "type-fest";

// An array of DynamicColor instances. They are properties of
// MaterialDynamicColors whose value types are DynamicColor, i.e.,
// [MaterialDynamicColors.background, MaterialDynamicColors.onBackground, ...]
const dynamicColors = Object.values(MaterialDynamicColors).filter(
  (color): color is DynamicColor => color instanceof DynamicColor
);

// Literal type of the color names in camelCase, e.g., "background", "onBackground", ...
// They are the keys of MaterialDynamicColors whose value types are DynamicColor.
export type ColorNameCamelCase = {
  [K in keyof typeof MaterialDynamicColors]: typeof MaterialDynamicColors[K] extends DynamicColor
    ? K
    : never;
}[keyof typeof MaterialDynamicColors];

// Literal type of the color names in snake_case, e.g., "background", "on_background", ...
// DynamicColor.name is in snake_case.
export type ColorNameSnakeCase = SnakeCase<ColorNameCamelCase>;

export type DynamicColors = {
  [K in ColorNameSnakeCase]: number;
};

export function useDynamicColors(
  sourceColor: MaybeRefOrGetter<string>,
  dark: MaybeRefOrGetter<boolean> = false,
  contrastLevel: MaybeRefOrGetter<number> = 0.0
) {
  const scheme = useDynamicScheme(sourceColor, dark, contrastLevel);
  const colors = computed(() => schemeToDynamicColors(toValue(scheme)));
  return { colors, scheme };
}

function useDynamicScheme(
  sourceColor: MaybeRefOrGetter<string>,
  dark: MaybeRefOrGetter<boolean>,
  contrastLevel: MaybeRefOrGetter<number> = 0.0
) {
  const sourceColorHct = computed(() =>
    Hct.fromInt(argbFromHex(toValue(sourceColor)))
  );
  const scheme = computed<DynamicScheme>(
    () =>
      new SchemeFidelity(
        toValue(sourceColorHct),
        toValue(dark),
        toValue(contrastLevel)
      )
  );

  return scheme;
}

const schemeToDynamicColors = (scheme: DynamicScheme): DynamicColors =>
  // @ts-ignore
  Object.fromEntries(
    dynamicColors.map((color) => [color.name, color.getArgb(scheme)])
  );
