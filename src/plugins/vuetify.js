import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    options: { customProperties: true },
    themes: {
      light: {
        primary: colors.teal.darken2,
        "on-primary": colors.grey.lighten5,
        secondary: "#b0bec5",
        anchor: "#8c9eff",
      },
    },
  },
});
