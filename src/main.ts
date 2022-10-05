import Vue from "vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { createPinia, PiniaVuePlugin, mapStores } from "pinia";
import { defineThemes } from "./monaco-editor";

import App from "@/app/AppWLoadConfig.vue";

Vue.use(PiniaVuePlugin);
Vue.config.productionTip = false;

const pinia = createPinia();

new Vue({
  router,
  vuetify,
  pinia,
  created() {
    defineThemes(this.$vuetify);
  },
  render: (h) => h(App),
}).$mount("#app");
