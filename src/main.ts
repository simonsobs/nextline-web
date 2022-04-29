import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { createProvider } from "./vue-apollo";
import { createPinia, PiniaVuePlugin, mapStores } from "pinia";
import { defineThemes } from "./monaco-editor";
import { useStore } from "@/stores/index";

Vue.use(PiniaVuePlugin);
Vue.config.productionTip = false;

const pinia = createPinia();

new Vue({
  router,
  vuetify,
  pinia,
  apolloProvider: createProvider(),
  computed: {
    ...mapStores(useStore),
  },
  created() {
    defineThemes(this.$vuetify);
    this.$nextTick(this.mainStore.loadConfig);
  },
  render: (h) => h(App),
}).$mount("#app");
