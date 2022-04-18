import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = function () {
  return {
    reset: 0,
    editing: false,
  };
};
const mutations = {
  reset(state) {
    state.reset++;
  },
  editing(state, value) {
    state.editing = value;
  },
};
const actions = {
  reset({ commit }) {
    commit("reset");
  },
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
