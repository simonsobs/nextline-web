import { ThemeDefinition as VuetifyTheme } from "vuetify";
import {
  argbFromHex,
  hexFromArgb,
  MaterialDynamicColors,
  SchemeFidelity,
  Hct,
} from "@material/material-color-utilities";

// https://github.com/material-foundation/material-color-utilities/issues/98
// https://github.com/material-foundation/material-color-utilities/blob/main/typescript/dynamiccolor/dynamic_color_test.ts
// https://material.io/blog/tone-based-surface-color-m3
// https://youtu.be/vnDhq8W98O4?t=648

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

function generate(
  sourceColor: string,
  contrastLevel: number = 0.0
): { light: VuetifyTheme; dark: VuetifyTheme } {
  const sourceColorHct = Hct.fromInt(argbFromHex(sourceColor));

  const lightScheme = new SchemeFidelity(sourceColorHct, false, contrastLevel);
  const darkScheme = new SchemeFidelity(sourceColorHct, true, contrastLevel);

  const lightColors: VuetifyTheme["colors"] = Object.fromEntries(
    dynamicColors.map((color) => [
      color.name.replace(/_/g, "-"),
      hexFromArgb(color.getArgb(lightScheme)),
    ])
  );

  const darkColors: VuetifyTheme["colors"] = Object.fromEntries(
    dynamicColors.map((color) => [
      color.name.replace(/_/g, "-"),
      hexFromArgb(color.getArgb(darkScheme)),
    ])
  );

  const lightTheme: VuetifyTheme = {
    dark: false,
    colors: lightColors,
  };

  const darkTheme: VuetifyTheme = {
    dark: true,
    colors: darkColors,
  };

  return { light: lightTheme, dark: darkTheme };
}

export { generate };
