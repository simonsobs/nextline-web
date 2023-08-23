import { computed, toValue } from "vue";
import type { MaybeRefOrGetter } from "vue";
import {
  argbFromHex,
  MaterialDynamicColors,
  SchemeFidelity,
  DynamicScheme,
  Hct,
} from "@material/material-color-utilities";

/**
 * The code to generate Dynamic Color of Material Design:
 * https://m3.material.io/styles/color/dynamic-color/
 *
 * It uses material-color-utilities:
 * https://github.com/material-foundation/material-color-utilities
 *
 * The code is based on dynamic_color_test.ts:
 * https://github.com/material-foundation/material-color-utilities/blob/ce99247b6ba/typescript/dynamiccolor/dynamic_color_test.ts
 *
 * This issue has a link to the above file:
 * https://github.com/material-foundation/material-color-utilities/issues/98
 *
 *
 * This YouTube video explains the dynamic scheme:
 * https://youtu.be/vnDhq8W98O4?t=648
 *
 * This blog post explains the surface colors:
 * https://material.io/blog/tone-based-surface-color-m3
 *
 */

export function useDynamicTheme(
  sourceColor: MaybeRefOrGetter<string>,
  dark: MaybeRefOrGetter<boolean>,
  contrastLevel: MaybeRefOrGetter<number> = 0.0
) {
  const { scheme } = useDynamicScheme(sourceColor, dark, contrastLevel);
  const theme = computed(() => schemeToTheme(toValue(scheme)));
  return { theme };
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
  return { scheme };
}

const schemeToTheme = (scheme: DynamicScheme) => ({
  dark: scheme.isDark,
  colors: schemeToDynamicColors(scheme),
});

const schemeToDynamicColors = (scheme: DynamicScheme) =>
  Object.fromEntries(
    dynamicColors.map((color) => [color.name, color.getArgb(scheme)])
  );

const dynamicColors = [
  MaterialDynamicColors.background,
  MaterialDynamicColors.onBackground,
  MaterialDynamicColors.surface,
  MaterialDynamicColors.surfaceDim,
  MaterialDynamicColors.surfaceBright,
  MaterialDynamicColors.surfaceContainerLowest,
  MaterialDynamicColors.surfaceContainerLow,
  MaterialDynamicColors.surfaceContainer,
  MaterialDynamicColors.surfaceContainerHigh,
  MaterialDynamicColors.surfaceContainerHighest,
  MaterialDynamicColors.onSurface,
  MaterialDynamicColors.surfaceVariant,
  MaterialDynamicColors.onSurfaceVariant,
  MaterialDynamicColors.inverseSurface,
  MaterialDynamicColors.inverseOnSurface,
  MaterialDynamicColors.outline,
  MaterialDynamicColors.outlineVariant,
  MaterialDynamicColors.shadow,
  MaterialDynamicColors.scrim,
  MaterialDynamicColors.surfaceTint,
  MaterialDynamicColors.primary,
  MaterialDynamicColors.onPrimary,
  MaterialDynamicColors.primaryContainer,
  MaterialDynamicColors.onPrimaryContainer,
  MaterialDynamicColors.inversePrimary,
  MaterialDynamicColors.secondary,
  MaterialDynamicColors.onSecondary,
  MaterialDynamicColors.secondaryContainer,
  MaterialDynamicColors.onSecondaryContainer,
  MaterialDynamicColors.tertiary,
  MaterialDynamicColors.onTertiary,
  MaterialDynamicColors.tertiaryContainer,
  MaterialDynamicColors.onTertiaryContainer,
  MaterialDynamicColors.error,
  MaterialDynamicColors.onError,
  MaterialDynamicColors.errorContainer,
  MaterialDynamicColors.onErrorContainer,
  MaterialDynamicColors.primaryFixed,
  MaterialDynamicColors.primaryFixedDim,
  MaterialDynamicColors.onPrimaryFixed,
  MaterialDynamicColors.onPrimaryFixedVariant,
  MaterialDynamicColors.secondaryFixed,
  MaterialDynamicColors.secondaryFixedDim,
  MaterialDynamicColors.onSecondaryFixed,
  MaterialDynamicColors.onSecondaryFixedVariant,
  MaterialDynamicColors.tertiaryFixed,
  MaterialDynamicColors.tertiaryFixedDim,
  MaterialDynamicColors.onTertiaryFixed,
  MaterialDynamicColors.onTertiaryFixedVariant,
];
