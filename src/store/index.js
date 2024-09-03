import { createStore } from "vuex";
import user from "./modules/user";

export default createStore({
  modules: {
    user, // Módulo para lidar com a autenticação e dados do usuário
    // outros módulos como kids e checklists podem ser adicionados aqui futuramente
  },
});
