const state = {
  user: JSON.parse(localStorage.getItem('user')) || '',
};

const actions = {
  setUser({ commit }, user) {
    localStorage.setItem('user', JSON.stringify(user));
    commit('setUser', user);
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};

const getters = {
  user: state => state.user,
};

export default {
  namespaced: true,

  state,
  getters,
  actions,
  mutations,
};
