<template>
  <div class="grid-row">
    <TodoItem
      v-for="todoItem in todos"
      :title="todoItem.title"
      :body="todoItem.body"
      :event_time="todoItem.event_time"
      :created_at="todoItem.created_at"
      :color="todoItem.colors"
      :id="todoItem.id"
      :clickable="clickable"
      :user="todoItem.user"
      :key="todoItem.id"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import TodoItem from '@/components/TodoItem';

export default {
  name: 'TodoList',
  props: {
    todos: {
      type: Array,
      required: true,
    },
    clickable: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  components: {
    TodoItem,
  },
  /*  computed: {
    ...mapGetters('Todos', ['allTodos', 'loading', 'error']),
    getAllTodos() {
      return this.allTodos.todos;
    },
  },
  methods: {
    ...mapActions('Todos', ['fetchTodos']),
  },
  async mounted() {
    await this.fetchTodos();
    console.log(this.getAllTodos);
  },*/
};
</script>
