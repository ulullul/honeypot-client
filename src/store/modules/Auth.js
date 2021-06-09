const state = {
  token: localStorage.getItem('token') || '',
};

const actions = {
  logout({ commit }) {
    localStorage.removeItem('token');
    commit('clearToken');
  },
  setToken({ commit }, token) {
    localStorage.setItem('token', token);
    commit('setToken', token);
  },
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = '';
  },
};

const getters = {
  token: state => state.token,
};

export default {
  namespaced: true,

  state,
  getters,
  actions,
  mutations,
};
