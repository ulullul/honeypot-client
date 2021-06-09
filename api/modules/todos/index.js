import axios from '@/axios';

export default {
  getAll() {
    return axios.get('todos');
  },
  addTodo(payload) {
    return axios.post('todos', payload);
  },
  getById(id) {
    return axios.get(`todos/${id}`);
  },
  deleteById(id) {
    return axios.delete(`todos/${id}`);
  },
  modifyById(id, payload) {
    return axios.patch(`todos/${id}`, payload);
  },
};
