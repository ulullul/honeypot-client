import Vue from 'vue';
import Vuex from 'vuex';
import Todos from '@/store/modules/Todos';
import Auth from '@/store/modules/Auth';
import User from '@/store/modules/User';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: { Todos, Auth, User },
});

