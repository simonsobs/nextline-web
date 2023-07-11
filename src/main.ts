import { createApp, h } from "vue";

import pinia from "@/stores";
import router from "@/router";
import vuetify from "@/plugins/vuetify";
import { defineThemes } from "@/monaco-editor";

import App from "@/app/AppWLoadConfig.vue";

const app = createApp({
  created() {
    defineThemes(this.$vuetify);
  },
  render: () => h(App),
});
app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount("#app");
