import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { md3 } from "vuetify/blueprints";
import { aliases, mdi } from "vuetify/iconsets/mdi";

import * as labsComponents from "vuetify/labs/components";

import "@/styles/variables.scss";

const vuetify = createVuetify({
  components: { ...components, ...labsComponents },
  directives,
  blueprint: md3,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
  display: {
    mobileBreakpoint: "xs",
  },
  defaults: {
    // https://vuetifyjs.com/en/features/global-configuration/
    VTooltip: {
      openDelay: 800,
    },
  },
});

export default vuetify;
