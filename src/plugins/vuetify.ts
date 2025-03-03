import "vuetify/styles";
import { createVuetify } from "vuetify";
import { md3 } from "vuetify/blueprints";
import { aliases, mdi } from "vuetify/iconsets/mdi";


import "@/styles/vuetify.scss";

const vuetify = createVuetify({
  blueprint: md3,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
  display: {
    mobileBreakpoint: "sm",
  },
  defaults: {
    // https://vuetifyjs.com/en/features/global-configuration/
    VTooltip: {
      openDelay: 800,
    },
  },
});

export default vuetify;
