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
import type { MaybeRef } from "vue";
import {
  argbFromHex,
  hexFromArgb,
  Hct,
} from "@material/material-color-utilities";
import { DynamicScheme } from "@material/material-color-utilities";
import { ColorNameMap } from "./colors";
import type { ColorName } from "./colors";
import { SchemeNameMap } from "./schemes";
import type { SchemeName } from "./schemes";

interface Options {
  dark?: boolean;
  contrastLevel?: number;
  schemeName?: SchemeName;
}

export interface OptionsHex extends Options {
  sourceColor?: string; // e.g., "#6750A4"
}

export interface OptionsHct extends Options {
  sourceColorHct?: Hct;
}

//  Default seed in https://www.figma.com/community/file/1035197037666593721/Visualizing-dynamic-color-in-your-app-with-Material-Design
const DEFAULT_SOURCE_COLOR_HCT = hctFromHex("#6750A4");

const DEFAULT_OPTIONS: Required<OptionsHct> = {
  sourceColorHct: DEFAULT_SOURCE_COLOR_HCT,
  dark: false,
  contrastLevel: 0.0,
  schemeName: "fidelity",
};

export function useDynamicColors(options?: MaybeRef<OptionsHex>) {
  const hex = computed(() => options && toValue(options)?.sourceColor);

  const hct = computed(() =>
    hex.value === undefined ? undefined : hctFromHex(hex.value)
  );

  // Replace sourceColor with sourceColorHct.
  const optionsHct = computed(() =>
    (({ sourceColor, ...o }) => o)({
      sourceColorHct: hct.value,
      ...toValue(options),
    })
  );

  const { colorsHct, scheme } = useDynamicColorsHct(optionsHct);
  const colors = computed(() => replaceHctWithHex(toValue(colorsHct)));

  return { colors, scheme };
}

const replaceHctWithHex = (colorsHct: { [k in ColorName]: Hct }) =>
  // replace the object values while keeping the keys
  Object.assign(
    {},
    ...Object.entries(colorsHct).map(([colorName, hct]) => ({
      [colorName]: hexFromHct(hct),
    }))
  ) as { [k in ColorName]: string };

export function useDynamicColorsHct(options?: MaybeRef<OptionsHct>) {
  const scheme = useDynamicSchemeOld(options);
  const colorsHct = computed(() => generateColorsFromScheme(toValue(scheme)));
  return { colorsHct, scheme };
}

export function hctFromHex(hex: string) {
  return Hct.fromInt(argbFromHex(hex));
}

export function hexFromHct(hct: Hct) {
  return hexFromArgb(hct.toInt());
}

/**
 * Create a dynamic scheme reactively.
 */
function useDynamicSchemeOld(options?: MaybeRef<OptionsHct>) {
  const opt = computed(() => ({ ...DEFAULT_OPTIONS, ...toValue(options) }));
  const schemeName = computed(() => opt.value.schemeName);
  const schemeClass = computed(() => SchemeNameMap[schemeName.value]);
  const sourceColorHct = computed(() => opt.value.sourceColorHct);
  const dark = computed(() => opt.value.dark);
  const contrastLevel = computed(() => opt.value.contrastLevel);
  const scheme = computed(
    () =>
      new schemeClass.value(
        sourceColorHct.value,
        dark.value,
        contrastLevel.value
      )
  );
  return scheme;
}

const generateColorsFromScheme = (scheme: DynamicScheme) =>
  Object.assign(
    {},
    ...Object.entries(ColorNameMap).map(([colorName, dynamicColor]) => ({
      [colorName]: dynamicColor.getHct(scheme),
    }))
  ) as { [k in ColorName]: Hct };
