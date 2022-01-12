import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = function () {
  return {
    reset: 0,
    editing: false,
    layout: "grid", // "grid", "tabs"
  };
};
const mutations = {
  reset(state) {
    state.reset++;
  },
  editing(state, value) {
    state.editing = value;
  },
  layout(state, value) {
    state.layout = value;
  },
};
const actions = {
  reset({ commit }) {
    commit("reset");
  },
  editing({ commit }, value = true) {
    commit("editing", value);
  },
  layout({ commit }, value) {
    commit("layout", value);
  },
};

export const storeConfig = {
  state,
  mutations,
  actions,
};

const store = new Vuex.Store(storeConfig);
export default store;
