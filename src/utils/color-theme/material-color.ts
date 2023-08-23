import { ThemeDefinition as VuetifyTheme } from "vuetify";
import {
  argbFromHex,
  hexFromArgb,
  MaterialDynamicColors,
  SchemeFidelity,
  DynamicScheme,
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

const toColors = (scheme: DynamicScheme) =>
  Object.fromEntries(
    dynamicColors.map((color) => [color.name, color.getArgb(scheme)])
  );

const toTheme = (scheme: DynamicScheme) => ({
  dark: scheme.isDark,
  colors: toColors(scheme),
});

const toVuetifyColors = (colors: Record<string, number>) =>
  Object.fromEntries(
    Object.entries(colors).map(([key, value]) => [
      key.replace(/_/g, "-"),
      hexFromArgb(value),
    ])
  );

const toVuetifyTheme = (theme: {
  dark: boolean;
  colors: Record<string, number>;
}) => ({
  dark: theme.dark,
  colors: toVuetifyColors(theme.colors),
});

function generate(
  sourceColor: string,
  contrastLevel: number = 0.0
): { light: VuetifyTheme; dark: VuetifyTheme } {
  const sourceColorHct = Hct.fromInt(argbFromHex(sourceColor));

  const lightScheme = new SchemeFidelity(sourceColorHct, false, contrastLevel);
  const darkScheme = new SchemeFidelity(sourceColorHct, true, contrastLevel);

  const lightTheme = toTheme(lightScheme);
  const darkTheme = toTheme(darkScheme);

  const lightVuetifyTheme: VuetifyTheme = toVuetifyTheme(lightTheme);
  const darkVuetifyTheme: VuetifyTheme = toVuetifyTheme(darkTheme);

  return { light: lightVuetifyTheme, dark: darkVuetifyTheme };
}

export { generate };
