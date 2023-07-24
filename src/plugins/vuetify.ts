import "vuetify/styles";
import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { md3 } from "vuetify/blueprints";
import { aliases, mdi } from "vuetify/iconsets/mdi";

// https://github.com/vuetifyjs/vuetify/issues/16346
import colors from "vuetify/lib/util/colors.mjs";

import { fromSourceColor } from "./material-color-old";
import { generateLightAndDarkThemesFromSourceColor } from "./material-color";

const baseColor: string = colors.blueGrey.darken2;

const [dynamicLight, dynamicDark] =
  generateLightAndDarkThemesFromSourceColor(baseColor);

if (dynamicLight.colors)
  dynamicLight.colors.accent = dynamicLight.colors.tertiary;

if (dynamicDark.colors) dynamicDark.colors.accent = dynamicDark.colors.tertiary;

const [materialLight, materialDark] = fromSourceColor(baseColor);

if (materialLight.colors)
  materialLight.colors.accent = materialLight.colors.tertiary;

if (materialDark.colors)
  materialDark.colors.accent = materialDark.colors.tertiary;

const customLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: colors.blueGrey.darken2,
    accent: colors.orange.base,
    surface: colors.blueGrey.lighten5,
    // background: colors.grey.lighten3,
    background: colors.blueGrey.lighten5,
  },
};

const vuetify = createVuetify({
  components,
  directives,
  blueprint: md3,
  theme: {
    defaultTheme: "dynamicLight",
    variations: {
      colors: ["primary", "accent", "surface", "background"],
      lighten: 5,
      darken: 5,
    },
    themes: {
      customLightTheme,
      materialLight,
      materialDark,
      dynamicLight,
      dynamicDark,
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
});

export default vuetify;
