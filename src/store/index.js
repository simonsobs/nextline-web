import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = function () {
  return {};
};
const mutations = {};
const actions = {};

export const storeConfig = {
  state,
  mutations,
  actions,
};

const store = new Vuex.Store(storeConfig);
export default store;
