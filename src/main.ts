import { createApp, h } from "vue";

import pinia from "@/plugins/pinia";
import router from "@/plugins/router";
import vuetify from "@/plugins/vuetify";

import App from "@/app/App.vue";

import DevToolCheckboxes from "@/components/dev/DevToolCheckboxes.vue";
import SuspenseC from "@/components/SuspenseC.vue";

createApp({ render: () => h(App) })
  .component("DevToolCheckboxes", DevToolCheckboxes)
  .component("SuspenseC", SuspenseC)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .mount("#app");
