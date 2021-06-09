import axios from '@/axios';

export default {
  signIn(payload) {
    return axios.post('auth', payload);
  },
  signUp(payload) {
    return axios.post('user', payload);
  },
  getAllTodos() {
    return axios.get('todos/user');
  },
};
