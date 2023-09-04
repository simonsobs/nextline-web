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
import type { MaybeRefOrGetter, MaybeRef } from "vue";
import {
  argbFromHex,
  hexFromArgb,
  SchemeContent,
  SchemeFidelity,
  SchemeNeutral,
  SchemeMonochrome,
  SchemeVibrant,
  SchemeExpressive,
  SchemeTonalSpot,
  Hct,
} from "@material/material-color-utilities";
import { DynamicScheme } from "@material/material-color-utilities";
import { ColorNameMap } from "./colors";
import type { ColorName } from "./colors";

const SchemeNameMap = {
  content: SchemeContent,
  fidelity: SchemeFidelity,
  neutral: SchemeNeutral,
  monochrome: SchemeMonochrome,
  vibrant: SchemeVibrant,
  expressive: SchemeExpressive,
  "tonal-spot": SchemeTonalSpot,
} as const;

type SchemeName = keyof typeof SchemeNameMap;

interface UseDynamicColorsOptions {
  dark?: boolean;
  contrastLevel?: number;
  schemeName?: SchemeName;
}

const useDynamicColorsOptionsDefault: Required<UseDynamicColorsOptions> = {
  dark: false,
  contrastLevel: 0.0,
  schemeName: "fidelity",
};

export function useDynamicColors(
  sourceColor: MaybeRefOrGetter<string>,
  options?: MaybeRef<UseDynamicColorsOptions>
) {
  const sourceColorHct = computed(() => hctFromHex(toValue(sourceColor)));
  const { colorsHct, scheme } = useDynamicColorsHct(sourceColorHct, options);
  const colors = computed(() => colorsHctToColors(toValue(colorsHct)));

  return { colors, scheme };
}

export function useDynamicColorsHct(
  sourceColorHct: MaybeRefOrGetter<Hct>,
  options?: MaybeRef<UseDynamicColorsOptions>
) {
  const scheme = useDynamicScheme(sourceColorHct, options);
  const colorsHct = computed(() => schemeToDynamicColorsHct(toValue(scheme)));

  return { colorsHct, scheme };
}

function hctFromHex(hex: string) {
  return Hct.fromInt(argbFromHex(hex));
}

function hexFromHct(hct: Hct) {
  return hexFromArgb(hct.toInt());
}

/**
 * Create a dynamic scheme reactively.
 */
function useDynamicScheme(
  sourceColorHct: MaybeRefOrGetter<Hct>,
  options?: MaybeRef<UseDynamicColorsOptions>
) {
  const _options = { ...useDynamicColorsOptionsDefault, ...toValue(options) };
  const schemeClass = shallowRef(SchemeNameMap[toValue(_options.schemeName)]);
  const scheme = computed(
    () =>
      new schemeClass.value(
        toValue(sourceColorHct),
        toValue(_options.dark),
        toValue(_options.contrastLevel)
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
