<template>
  <div class="row">
    <div class="col-12">
      <h2 class="mb-3">Gerenciamento de Usuários</h2>
      <table
        class="table table-striped table-bordered table-hover table-responsive"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in getUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="row">
    <div class="12">
      <!-- Controles de Paginação -->
      <nav v-if="getPagination.links.length">
        <ul class="pagination justify-content-center">
          <li
            v-for="(link, index) in getPagination.links"
            :key="index"
            class="page-item"
            :class="{ active: link.active }"
          >
            <a
              class="page-link"
              @click.prevent="fetchPageFromLink(link.url)"
              v-if="link.url"
              href="#"
            >
              {{ link.label }}
            </a>
            <span class="page-link" v-else>{{ link.label }}</span>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "UserList",
  data: () => {
    return {
      users: [],
    };
  },
  computed: {
    ...mapGetters("user", ["getUsers", "getPagination"]),
  },
  methods: {
    ...mapActions("user", ["fetchUsers"]),

    fetchPage(page) {
      if (page > 0 && page <= this.getPagination.last_page) {
        this.fetchUsers(page); // Dispara a ação com a página desejada
      }
    },

    fetchPageFromLink(url) {
      if (url) {
        const pageParam = new URL(url).searchParams.get("page");
        this.fetchUsers(pageParam); // Dispara a ação com a página capturada do link
      }
    },
  },
  created() {
    this.fetchUsers(); // Chamar a ação para buscar os usuários ao montar o componente
  },
};
</script>

<style scoped></style>
