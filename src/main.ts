import { createApp, h } from "vue";

import pinia from "@/plugins/pinia";
import router from "@/plugins/router";
import vuetify from "@/plugins/vuetify";

import App from "@/app/App.vue";

import DevToolCheckboxes from "@/components/dev/DevToolCheckboxes.vue";

createApp({ render: () => h(App) })
  .component("DevToolCheckboxes", DevToolCheckboxes)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .mount("#app");
