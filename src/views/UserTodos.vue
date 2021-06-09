<template>
  <div v-if="loading" class="loading-container">
    <md-progress-spinner
      :md-diameter="100"
      :md-stroke="10"
      md-mode="indeterminate"
    ></md-progress-spinner>
  </div>
  <md-empty-state
    v-else-if="!loading && error"
    md-icon="error"
    class="md-accent"
    md-label="There is nothing"
    :md-description="`Error: ${error}`"
  >
    <md-button class="md-primary md-raised" to="/add">Add todo</md-button>
  </md-empty-state>
  <md-empty-state
    v-else-if="!todos.length && !loading && !error"
    md-icon="bookmarks"
    md-label="There is nothing"
    md-description="You can create your first todo, follow this link"
  >
    <md-button class="md-primary md-raised" to="/add">Add todo</md-button>
  </md-empty-state>
  <todo-list v-else :todos="todos"></todo-list>
</template>

<script>
import TodoList from '@/components/TodoList';

export default {
  name: 'AllTodos',
  components: { TodoList },
  data() {
    return {
      loading: true,
      error: false,
      todos: [],
    };
  },
  methods: {
    async fetchTodos() {
      try {
        this.todos = (await this.$api.user.getAllTodos()).data.todos;
      } catch (e) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    await this.fetchTodos();
  },
};
</script>

<style scoped lang="scss">
.loading-container {
  height: 91vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
