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

import { computed, toValue, shallowRef } from "vue";
import type { MaybeRefOrGetter, ShallowRef } from "vue";
import {
  argbFromHex,
  hexFromArgb,
  SchemeFidelity,
  Hct,
} from "@material/material-color-utilities";
import { DynamicScheme } from "@material/material-color-utilities";
import { ColorNameMap } from "./colors";
import type { ColorName } from "./colors";

export function useDynamicColors(
  sourceColor: MaybeRefOrGetter<string>,
  dark: MaybeRefOrGetter<boolean> = false,
  contrastLevel: MaybeRefOrGetter<number> = 0.0
) {
  const sourceColorHct = computed(() => hctFromHex(toValue(sourceColor)));
  const { colorsHct, scheme } = useDynamicColorsHct(
    sourceColorHct,
    dark,
    contrastLevel
  );
  const colors = computed(() => colorsHctToColors(toValue(colorsHct)));

  return { colors, scheme };
}

export function useDynamicColorsHct(
  sourceColorHct: MaybeRefOrGetter<Hct>,
  dark: MaybeRefOrGetter<boolean> = false,
  contrastLevel: MaybeRefOrGetter<number> = 0.0
) {
  const schemeClass = shallowRef(SchemeFidelity);
  const scheme = useDynamicScheme(
    schemeClass,
    sourceColorHct,
    dark,
    contrastLevel
  );
  const colorsHct = computed(() => schemeToDynamicColorsHct(toValue(scheme)));

  return { colorsHct, scheme };
}

function hctFromHex(hex: string) {
  return Hct.fromInt(argbFromHex(hex));
}

function hexFromHct(hct: Hct) {
  return hexFromArgb(hct.toInt());
}

interface SchemeClass {
  new (
    sourceColorHct: Hct,
    isDark: boolean,
    contrastLevel: number
  ): DynamicScheme;
}

/**
 * Create a dynamic scheme reactively.
 */
function useDynamicScheme(
  dynamicColor: ShallowRef<SchemeClass>,
  sourceColorHct: MaybeRefOrGetter<Hct>,
  dark: MaybeRefOrGetter<boolean>,
  contrastLevel: MaybeRefOrGetter<number> = 0.0
) {
  const scheme = computed(
    () =>
      new dynamicColor.value(
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

const schemeToDynamicColorsHct = (scheme: DynamicScheme) =>
  Object.fromEntries(
    Object.entries(ColorNameMap).map(([colorName, dynamicColor]) => [
      colorName, // e.g., "on-surface"
      dynamicColor.getHct(scheme),
    ])
  ) as { [k in ColorName]: Hct };

const colorsHctToColors = (colorsHct: { [k in ColorName]: Hct }) =>
  Object.fromEntries(
    Object.entries(colorsHct).map(([colorName, hct]) => [
      colorName,
      hexFromHct(hct),
    ])
  ) as { [k in ColorName]: string };
