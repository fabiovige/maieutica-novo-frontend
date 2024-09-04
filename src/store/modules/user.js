import apiClient from "@/services/axios";

// armazenamento dos dados
const state = {
  token: localStorage.getItem("token") || "",
  user: {
    id: localStorage.getItem("user_id") || null,
    name: localStorage.getItem("name") || "",
    email: localStorage.getItem("email") || "",
  },
  users: {
    data: [], // Inicializando a lista de usuários vazia
    current_page: 1,
    last_page: 1,
    total: 0,
    links: [],
  },
};

// devolve os dados para componentes externo
const getters = {
  isAuthenticated: (state) => !!state.token,
  getUser: (state) => state.user,
  getToken: (state) => state.token,
  getUsers: (state) => state.users.data || [],
  getPagination: (state) => state.users || {},
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
  SET_USERS(state, users) {
    state.users = users; // Mutação para definir os usuários no estado
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

  /** LISTAR USUÁRIOS **/
  async fetchUsers({ commit }, page = 1) {
    try {
      const token = localStorage.getItem("token");

      const response = await apiClient.get(`/users?page=${page}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Enviando o token no cabeçalho Authorization
        },
      });
      commit("SET_USERS", response.data); // Armazenar usuários no estado
    } catch (error) {
      console.error(
        "Erro ao buscar usuários:",
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
