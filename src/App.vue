<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Maiêutica</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/users">Usuários</router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="handlerLogout">Sair</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isLogado: false,
    };
  },
  methods: {
    ...mapActions("user", ["logout"]),
    async handlerLogout() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await this.logout();
          this.$router.push({ name: "login" });
        }
        this.$router.push({ name: "login" });
      } catch (error) {
        console.log(error.response.data);
        console.log(error.message);
        localStorage.removeItem("token"); // remove no client
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>
