import axios from "axios";
export default {
  namespaced: true,

  state: {
    criteria: null,
    subcriteria: null,
    error: null,
  },

  getters: {
    criteria(state) {
      return state.criteria;
    },
    subcriteria(state) {
      return state.subcriteria;
    },
    getError(state) {
      return state.error;
    },
  },

  mutations: {
    SET_CRITERIA(state, payload) {
      state.criteria = payload;
    },

    SET_ERROR(state, payload) {
      state.error = payload;
    },
  },

  actions: {
    getCriteria({ commit }) {
      return new Promise((resolve) => {
        axios
          .get("criteria")
          .then((response) => {
            commit("SET_CRITERIA", response.data.criteria);
            resolve();
          })
          .catch((e) => {
            commit("SET_ERROR", e.response.data.error);
          });
      });
    },
  },
};
