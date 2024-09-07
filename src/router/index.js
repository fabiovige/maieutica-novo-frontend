import Login from "@/components/UserLogin.vue";
import UserList from "@/components/users/UserList.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },

  {
    path: "/users",
    name: "users",
    component: UserList,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Se a rota requer autenticação e o token não está presente, redireciona para login
    if (!token) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    // Se a rota não requer autenticação e o usuário já está logado, redireciona para home
    if (to.name === "login" && token) {
      next({ name: "home" });
    } else {
      next();
    }
  }
});

export default router;
