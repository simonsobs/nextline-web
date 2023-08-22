import { createApp, h } from "vue";

import pinia from "@/plugins/pinia";
import router from "@/plugins/router";
import vuetify from "@/plugins/vuetify";

import App from "@/app/App.vue";

const app = createApp({
  render: () => h(App),
});
app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount("#app");
