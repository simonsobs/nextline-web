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
  hexFromArgb,
  SchemeFidelity,
  Hct,
} from "@material/material-color-utilities";
import type { DynamicScheme } from "@material/material-color-utilities";
import { ColorNameMap } from "./colors";
import type { ColorName } from "./colors";

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

const schemeToDynamicColors = (scheme: DynamicScheme) =>
  Object.fromEntries(
    Object.entries(ColorNameMap).map(([colorName, dynamicColor]) => [
      colorName, // e.g., "on-surface"
      hexFromArgb(dynamicColor.getArgb(scheme)), // e.g., "#1A1B22"
    ])
  ) as { [k in ColorName]: string };
