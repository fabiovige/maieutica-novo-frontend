<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
      <p v-if="message">{{ message.message }}</p>
    </form>
  </div>
</template>

<script>
import apiClient from "@/services/axios.js";

export default {
  name: "UserLogin",
  data() {
    return {
      email: "",
      password: "",
      message: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await apiClient.post("/login", {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user_id", response.data.user.id);
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("email", response.data.user.email);
        this.$router.push({ name: "home" });
      } catch (error) {
        this.message = error.response ? error.response.data : error.message;
      }
    },
  },
};
</script>
