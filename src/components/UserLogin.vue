<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
      <p v-if="message">{{ message.message }}</p>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "UserLogin",
  data() {
    return {
      email: "eduardo@gmail.com",
      password: "secret123",
      message: "",
    };
  },
  methods: {
    ...mapActions("user", ["login"]),
    async handleLogin() {
      try {
        console.log("teste");
        await this.login({ email: this.email, password: this.password });
        this.$router.push({ name: "home" });
      } catch (error) {
        this.message = error.response ? error.response.data : error.message;
      }
    },
  },
};
</script>
