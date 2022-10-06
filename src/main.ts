import Vue from "vue";

import pinia from "@/stores";
import router from "@/router";
import vuetify from "@/plugins/vuetify";
import { defineThemes } from "@/monaco-editor";

import App from "@/app/AppWLoadConfig.vue";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  pinia,
  created() {
    defineThemes(this.$vuetify);
  },
  render: (h) => h(App),
}).$mount("#app");
