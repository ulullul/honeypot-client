<template>
  <div v-if="loading" class="loading-overlay">
    <md-progress-spinner
      :md-diameter="100"
      :md-stroke="10"
      md-mode="indeterminate"
    ></md-progress-spinner>
  </div>
  <div v-else style="{'justify-content': 'center', 'display': 'flex'}">
    <TodoItem
      :title="todo.title"
      :body="todo.body"
      :event_time="todo.event_time"
      :created_at="todo.created_at"
      :color="todo.colors"
    />
    <md-button
      class="md-raised md-primary modify-btn"
      :to="{ name: 'ModifyTodo', params: $route.params.id }"
      ><md-icon class="icon">create</md-icon> Modify todo
    </md-button>
    <md-button class="md-raised md-accent modify-btn" @click.prevent="deleteOne"
      ><md-icon class="icon">delete</md-icon> Delete todo</md-button
    >
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem';

export default {
  name: 'TodoDetails',
  components: {
    TodoItem,
  },
  data() {
    return {
      loading: true,
      todo: {},
    };
  },
  async mounted() {
    try {
      this.todo = (
        await this.$api.todos.getById(this.$route.params.id)
      ).data.todo;
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async deleteOne() {
      try {
        this.loading = true;
        await this.$api.todos.deleteById(this.$route.params.id);
        // this.$router.push({ name: 'AllTodos' });
        this.$toasted.success('Note successfully deleted', {
          icon: 'check_circle',
          duration: 1000,
        });
      } catch (e) {
        this.$toasted.error('Error, please try again', {
          icon: 'error',
          duration: 1000,
        });
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.modify-btn {
  margin: 20px auto !important;
  display: block !important;
  width: 100% !important;
  max-width: 150px !important;
}

.loading-container {
  position: absolute;
  height: 91vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-overlay {
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
