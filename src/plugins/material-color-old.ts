import { hyphenate } from "@vue/shared";
import { ThemeDefinition as VuetifyTheme } from "vuetify";
import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
  Scheme,
} from "@material/material-color-utilities";

type VuetifyColors = VuetifyTheme["colors"];

/**
 * Generate light and dark Vuetify themes from a source color.
 *
 * This function uses Dynamic Color from Material Design.
 *
 * Originally based on the code in the Vuetify Playground in the issue
 * https://github.com/vuetifyjs/vuetify/issues/17181#issuecomment-1564441927
 *
 * Generated themes don't include all tokens, e.g., `surface-container-lowest`,
 * as pointed out in the issue
 * https://github.com/material-foundation/material-color-utilities/issues/98
 * This function uses Scheme. A post in the issue points out that Scheme is
 * deprecated and DynamicScheme is the new implementation.
 *
 * @param sourceColor - A hex color string.
 * @returns A tuple of light and dark Vuetify themes.
 * @example
 * ```ts
 * const [lightTheme, darkTheme] = fromSourceColor("#ff0000");
 * ```
 * @see { @link https://m3.material.io/styles/color/dynamic-color/overview | Dynamic Color}
 */
function fromSourceColor(sourceColor: string): [VuetifyTheme, VuetifyTheme] {
  // https://github.com/vuetifyjs/vuetify/issues/17181
  const theme = themeFromSourceColor(argbFromHex(sourceColor));

  const lightColors = schemeToVuetifyColors(theme.schemes.light);
  const darkColors = schemeToVuetifyColors(theme.schemes.dark);

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

function schemeToVuetifyColors(scheme: Scheme): VuetifyColors {
  // @ts-ignore
  return Object.entries(scheme.props).reduce(
    // @ts-ignore
    (acc, [k, v]) => ({ ...acc, [hyphenate(k)]: hexFromArgb(v) }),
    {} as VuetifyColors
  );
}

export { fromSourceColor };
