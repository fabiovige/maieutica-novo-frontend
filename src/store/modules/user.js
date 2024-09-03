import apiClient from "@/services/axios";

const state = {
  token: localStorage.getItem("token") || "",
  user: {
    id: localStorage.getItem("user_id") || null,
    name: localStorage.getItem("name") || "",
    email: localStorage.getItem("email") || "",
  },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  getUser: (state) => state.user,
  getToken: (state) => state.token,
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  CLEAR_AUTH(state) {
    state.token = "";
    state.user = {
      id: null,
      name: "",
      email: "",
    };
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
  },
};

const actions = {
  /** LOGIN **/
  async login({ commit }, credentials) {
    const response = await apiClient.post("/login", credentials);
    const { access_token, user } = response.data;

    localStorage.setItem("token", access_token);
    localStorage.setItem("user_id", user.id);
    localStorage.setItem("name", user.name);
    localStorage.setItem("email", user.email);

    commit("SET_TOKEN", access_token);
    commit("SET_USER", user);
  },

  /** LOGOUT **/
  async logout({ commit }) {
    try {
      const userId = state.user.id;

      if (!userId) {
        console.error("ID do usuário não encontrado.");
        return;
      }

      const response = await apiClient.post(`/logout/${userId}`);

      if (response.data.status) {
        console.log(response.data.message);
        commit("CLEAR_AUTH");
      } else {
        console.error("Erro ao deslogar:", response.data.message);
      }
    } catch (error) {
      console.error(
        "Erro ao fazer logout:",
        error.response ? error.response.data : error.message
      );
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
