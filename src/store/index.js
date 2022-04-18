import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = function () {
  return {
    editing: false,
  };
};
const mutations = {
  editing(state, value) {
    state.editing = value;
  },
};
const actions = {
  editing({ commit }, value = true) {
    commit("editing", value);
  },
};

export const storeConfig = {
  state,
  mutations,
  actions,
};

const store = new Vuex.Store(storeConfig);
export default store;
