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
import { useToast } from "vue-toastification";
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
      const toast = useToast();
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push({ name: "home" });
      } catch (error) {
        const message = error.response
          ? error.response.data.message
          : "Erro ao realizar login";
        toast.success(`${message}`, {
          timeout: 5000,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    },
  },
};
</script>
