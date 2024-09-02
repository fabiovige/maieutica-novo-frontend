<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <a href="#" @click.prevent="logout">Sair</a>
  </nav>
  <router-view />
</template>

<script>
import apiClient from "@/services/axios.js";

export default {
  methods: {
    async logout() {
      try {
        console.log("logout...");
        // Recupera o ID do usuário logado do localStorage
        const userId = localStorage.getItem("user_id");

        // Verifica se o ID do usuário existe antes de prosseguir
        if (!userId) {
          console.error("ID do usuário não encontrado.");
          return;
        }

        // Fazer requisição para a rota de logout no backend, passando o ID do usuário
        const response = await apiClient.post(`/logout/${userId}`);

        if (response.data.status) {
          console.log(response.data.message); // Exibir mensagem de sucesso no console
          // Remover o token e o ID do usuário do localStorage
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          // Redirecionar o usuário para a página de login
          this.$router.push({ name: "login" });
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
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
