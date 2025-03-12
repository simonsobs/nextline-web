import { createApp, h } from "vue";

import App from "@/app/App.vue";
import DevToolCheckboxes from "@/components/dev/DevToolCheckboxes.vue";
import SuspenseC from "@/components/SuspenseC.vue";
import pinia from "@/plugins/pinia";
import router from "@/plugins/router";
import vuetify from "@/plugins/vuetify";

// Types of global components are exported from src/global-components.d.ts

import "@/styles/variables.scss";

const app = createApp({ render: () => h(App) });

app.config.errorHandler = (err, vm, info) => {
  // Source of errors captured here are listed in
  // https://vuejs.org/api/application.html#app-config-errorhandler
  // Unhandled promise rejections are not captured here.
  console.error("Global Error:", "\nInstance:", vm, "\nInfo:", info, "\n", err);
};

app
  .component("DevToolCheckboxes", DevToolCheckboxes)
  .component("SuspenseC", SuspenseC)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .mount("#app");
