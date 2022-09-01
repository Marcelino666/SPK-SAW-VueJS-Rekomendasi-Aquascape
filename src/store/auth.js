import axios from "axios";

export default {
  namespaced: true,

  state: {
    token: null,
    user: null,
    error: null,
    admin: false,
  },

  getters: {
    authenticated(state) {
      return state.token != null && state.user != null;
    },

    user(state) {
      return state.user;
    },

    getError(state) {
      return state.error;
    },
    admin(state) {
      return state.admin;
    },
  },

  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },

    SET_USER(state, payload) {
      state.user = payload;
    },

    SET_ERROR(state, payload) {
      state.error = payload;
    },

    SET_ADMIN(state, payload) {
      state.admin = payload;
    },
  },

  actions: {
    signIn({ dispatch, commit }, payload) {
      return new Promise((resolve) => {
        axios
          .post("login", payload)
          .then((response) => {
            commit("SET_ERROR", null);
            localStorage.setItem("token", response.data.token);
            dispatch("attempt", response.data.token);
            resolve();
          })
          .catch((e) => {
            commit("SET_TOKEN", null);
            if (e.response.data.error) {
              commit("SET_ERROR", e.response.data.error);
            } else {
              commit("SET_ERROR", Object.values(e.response.data.errors)[0][0]);
            }
          });
      });
    },

    //   try {
    //   } catch (e) {
    //     commit("SET_TOKEN", null);
    //     if (e.response.data.error) {
    //       commit("SET_ERROR", e.response.data.error);
    //     } else {
    //       commit("SET_ERROR", Object.values(e.response.data.errors)[0][0]);
    //     }
    //   }

    // attempt({ commit, state }, payload) {
    //   return new Promise((resolve) => {
    //     commit("SET_ERROR", null);

    //     if (payload) {
    //       commit("SET_TOKEN", payload);
    //     }

    //     if (!state.token) {
    //       return;
    //     }

    //     axios
    //       .get("user", {
    //         headers: {
    //           Authorization: "Bearer " + payload,
    //         },
    //       })
    //       .then((response) => {
    //         commit("SET_USER", response.data);
    //         resolve();
    //       })
    //       .catch((e) => {
    //         commit("SET_TOKEN", null);
    //         commit("SET_USER", null);
    //         commit("SET_ERROR", e.response.data.status);
    //       });
    //   });
    // },

    async attempt({ commit, state }, payload) {
      commit("SET_ERROR", null);

      if (payload) {
        localStorage.setItem("token", payload);
        commit("SET_TOKEN", payload);
        axios.defaults.headers.post["Authorization"] =
          "Bearer " + localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.getItem("token");
      }

      if (!state.token || !localStorage.getItem("token")) {
        return;
      }

      try {
        let response = await axios.get("user", {
          headers: {
            Authorization: "Bearer " + payload,
          },
        });

        // commit("SET_USER", response.data);
        commit("SET_USER", {
          id: response.data.id,
          name: response.data.name,
          username: response.data.username,
          email: response.data.email,
        });

        if (response.data.is_admin == 1) {
          commit("SET_ADMIN", true);
        }
      } catch (e) {
        commit("SET_TOKEN", null);
        localStorage.removeItem("token");
        commit("SET_USER", null);
        commit("SET_ADMIN", false);
        commit("SET_ERROR", e.response.data.status);
      }
    },

    signOut({ commit }) {
      return new Promise((resolve) => {
        // console.log(axios.defaults.headers.common["Authorization"]);
        // console.log(axios.defaults.headers.post["Authorization"]);
        axios
          .post("logout")
          .then(() => {
            localStorage.removeItem("token");
            commit("SET_TOKEN", null);
            commit("SET_USER", null);
            commit("SET_ADMIN", false);
            resolve();
          })
          .catch((e) => {
            commit("SET_ERROR", e.response.data.status);
          });
      });
    },
  },
};
