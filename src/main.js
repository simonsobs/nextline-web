import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { createProvider } from "./vue-apollo";
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
Vue.config.productionTip = false;

const pinia = createPinia()

new Vue({
  router,
  vuetify,
  pinia,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
