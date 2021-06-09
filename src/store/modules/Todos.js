import axios from 'axios';
export default {
  namespaced: true,
  state: {
    todos: [],
    loading: true,
    error: '',
  },
  actions: {
    async fetchTodos(ctx) {
      try {
        const response = await axios.get('http://127.0.0.1:3000/todos');
        ctx.commit('setLoading', false);
        ctx.commit('updateTodos', response.data);
      } catch (error) {
        console.log(error.response);
        ctx.commit('setLoading', false);
        ctx.commit('setError', error.response.data.error.message);
      }
    },
    async addTodo(ctx, todo) {
      try {
        ctx.commit('setLoading', true);
        await axios.post('http://127.0.0.1:3000/todos', todo);
        ctx.commit('setLoading', false);
      } catch (error) {
        ctx.commit('setError', error.response.data.error.message);
      }
    },
    async modifyTodo(ctx, payload) {
      try {
        ctx.commit('setLoading', true);
        await axios.patch(
          `http://127.0.0.1:3000/todos/${payload.id}`,
          payload.todo,
          {
            headers: {
              auth:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidWx1bGx1bCIsImlhdCI6MTYyMzE3NDMxMCwiZXhwIjoxNjIzMjYwNzEwfQ.-hPlBwHV3Gtb6Fzf29ciIPmj4rRZ4vP28kBW2Xj6HnU",
            },
          }
        );
        ctx.commit('setLoading', false);
      } catch (error) {
        ctx.commit('setLoading', false);
        ctx.commit('setError', error.response.data.error.message);
      }
    },
    async deleteTodo(ctx, id) {
      try {
        ctx.commit('setLoading', true);
        await axios.delete(`http://127.0.0.1:3000/todos/${id}`, {
          headers: {
            auth:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidWx1bGx1bCIsImlhdCI6MTYyMzEwMjEwOCwiZXhwIjoxNjIzMTA1NzA4fQ.09i2iFuNX8QX1B6t9xgP7f2Aqvs9xlsh12Bih9z2no8',
          },
        });
        ctx.commit('setLoading', false);
      } catch (error) {
        ctx.commit('setLoading', false);
        ctx.commit('setError', error.response.data.error.message);
      }
    },
  },
  mutations: {
    updateTodos(state, todos) {
      state.todos = todos.todos;
    },
    setLoading(state, status) {
      state.loading = status;
    },
    setError(state, message) {
      state.error = message;
    },
    unsetError(state) {
      state.error = '';
    },
  },
  getters: {
    allTodos(state) {
      return state.todos;
    },
    todoById: state => id => {
      return state.todos.find(todo => todo.id === parseInt(id));
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
};
