// import Vue from "vue";
// import Vuetify from "vuetify/lib/framework";
// import colors from "vuetify/lib/util/colors";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

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

const vuetify = createVuetify({
  components,
  directives,
});

export default vuetify;
