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
  MaterialDynamicColors as MDC,
  SchemeFidelity,
  Hct,
  DynamicColor,
} from "@material/material-color-utilities";
import type { DynamicScheme } from "@material/material-color-utilities";
import type { KebabCase } from "type-fest";

const ColorNameMap = {
  "primary-palette-key-color": MDC.primaryPaletteKeyColor,
  "secondary-palette-key-color": MDC.secondaryPaletteKeyColor,
  "tertiary-palette-key-color": MDC.tertiaryPaletteKeyColor,
  "neutral-palette-key-color": MDC.neutralPaletteKeyColor,
  "neutral-variant-palette-key-color": MDC.neutralVariantPaletteKeyColor,
  background: MDC.background,
  "on-background": MDC.onBackground,
  surface: MDC.surface,
  "surface-dim": MDC.surfaceDim,
  "surface-bright": MDC.surfaceBright,
  "surface-container-lowest": MDC.surfaceContainerLowest,
  "surface-container-low": MDC.surfaceContainerLow,
  "surface-container": MDC.surfaceContainer,
  "surface-container-high": MDC.surfaceContainerHigh,
  "surface-container-highest": MDC.surfaceContainerHighest,
  "on-surface": MDC.onSurface,
  "surface-variant": MDC.surfaceVariant,
  "on-surface-variant": MDC.onSurfaceVariant,
  "inverse-surface": MDC.inverseSurface,
  "inverse-on-surface": MDC.inverseOnSurface,
  outline: MDC.outline,
  "outline-variant": MDC.outlineVariant,
  shadow: MDC.shadow,
  scrim: MDC.scrim,
  "surface-tint": MDC.surfaceTint,
  primary: MDC.primary,
  "on-primary": MDC.onPrimary,
  "primary-container": MDC.primaryContainer,
  "on-primary-container": MDC.onPrimaryContainer,
  "inverse-primary": MDC.inversePrimary,
  secondary: MDC.secondary,
  "on-secondary": MDC.onSecondary,
  "secondary-container": MDC.secondaryContainer,
  "on-secondary-container": MDC.onSecondaryContainer,
  tertiary: MDC.tertiary,
  "on-tertiary": MDC.onTertiary,
  "tertiary-container": MDC.tertiaryContainer,
  "on-tertiary-container": MDC.onTertiaryContainer,
  error: MDC.error,
  "on-error": MDC.onError,
  "error-container": MDC.errorContainer,
  "on-error-container": MDC.onErrorContainer,
  "primary-fixed": MDC.primaryFixed,
  "primary-fixed-dim": MDC.primaryFixedDim,
  "on-primary-fixed": MDC.onPrimaryFixed,
  "on-primary-fixed-variant": MDC.onPrimaryFixedVariant,
  "secondary-fixed": MDC.secondaryFixed,
  "secondary-fixed-dim": MDC.secondaryFixedDim,
  "on-secondary-fixed": MDC.onSecondaryFixed,
  "on-secondary-fixed-variant": MDC.onSecondaryFixedVariant,
  "tertiary-fixed": MDC.tertiaryFixed,
  "tertiary-fixed-dim": MDC.tertiaryFixedDim,
  "on-tertiary-fixed": MDC.onTertiaryFixed,
  "on-tertiary-fixed-variant": MDC.onTertiaryFixedVariant,
};

// It is possible to extract ColorNameMap from MaterialDynamicColors, e.g., with
// the following code:
//
//     const _ColorNameMap = Object.fromEntries(
//       Object.values(MDC)
//         .filter((value): value is DynamicColor => value instanceof DynamicColor)
//         .map((value) => [value.name.replace(/_/g, "-"), value])
//     );
//
// However, we define it explicitly so that we will notice when the defined
// colors in MaterialDynamicColors change.
//
// The following code check if ColorNameMap and MaterialDynamicColors have the
// same colors.

type ColorName = keyof typeof ColorNameMap;

// The keys of MaterialDynamicColors whose value types are DynamicColor.
// They are the color names in camelCase, e.g., "background", "onBackground", ...
type KeyOfMDC = {
  [K in keyof typeof MDC]: typeof MDC[K] extends DynamicColor ? K : never;
}[keyof typeof MDC];

// The keys in kebab-case, e.g., "background", "on-background", ...
type KeyOfMDCKebab = KebabCase<KeyOfMDC>;

// ColorName and KeyOfMDCKebab must be the same.
// The following two types must be both never.
type Missing = Exclude<KeyOfMDCKebab, ColorName>;
type Extra = Exclude<ColorName, KeyOfMDCKebab>;

// If these are not never, the expected errors below will not occur.

// @ts-expect-error
const missing: Missing = null as any;

// @ts-expect-error
const extra: Extra = null as any;

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
