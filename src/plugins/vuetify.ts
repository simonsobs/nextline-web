import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    options: { customProperties: true, variations: true },
    themes: {
      light: {
        primary: colors.blueGrey.darken2,
        accent: colors.orange.base,
        background: colors.grey.base, // https://stackoverflow.com/a/59720255/7309855
      },
    },
  },
});
