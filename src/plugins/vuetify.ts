import "vuetify/styles";
import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { md3 } from "vuetify/blueprints";
import { aliases, mdi } from "vuetify/iconsets/mdi";

// https://github.com/vuetifyjs/vuetify/issues/16346
import colors from "vuetify/lib/util/colors.mjs";

// Vue.use(Vuetify);

// export default new Vuetify({
//   theme: {
//     dark: false,
//     options: { customProperties: true, variations: true },
//     themes: {
//       light: {
//         primary: colors.blueGrey.darken2,
//         accent: colors.orange.base,
//         background: colors.grey.base, // https://stackoverflow.com/a/59720255/7309855
//       },
//     },
//   },
// });
//

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
    defaultTheme: "customLightTheme",
    variations: {
      colors: ["primary", "accent", "surface", "background"],
      lighten: 5,
      darken: 5,
    },
    themes: {
      customLightTheme,
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
});

export default vuetify;
