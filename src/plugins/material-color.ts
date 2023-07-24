import { ThemeDefinition as VuetifyTheme } from "vuetify";
import {
  argbFromHex,
  hexFromArgb,
  MaterialDynamicColors,
  SchemeContent,
  Hct,
} from "@material/material-color-utilities";

// https://github.com/material-foundation/material-color-utilities/issues/98
// https://github.com/material-foundation/material-color-utilities/blob/main/typescript/dynamiccolor/dynamic_color_test.ts

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

function generateLightAndDarkThemesFromSourceColor(
  sourceColor: string,
  contrastLevel: number = 0.0
): [VuetifyTheme, VuetifyTheme] {
  const sourceColorHct = Hct.fromInt(argbFromHex(sourceColor));

  // Use SchemeContent for now. Other schema exists in @material/material-color-utilities.
  const lightScheme = new SchemeContent(sourceColorHct, false, contrastLevel);
  const darkScheme = new SchemeContent(sourceColorHct, true, contrastLevel);

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

  return [lightTheme, darkTheme];
}

export { generateLightAndDarkThemesFromSourceColor };
