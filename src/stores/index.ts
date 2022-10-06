import Vue from "vue";
import { PiniaVuePlugin, createPinia } from "pinia";
Vue.use(PiniaVuePlugin);
const pinia = createPinia();

export default pinia;
