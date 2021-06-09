import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'AllTodos',
    component: () =>
      import(/* webpackChunkName: "allTodos" */ '../views/AllTodos.vue'),
  },
  {
    path: '/my-todos',
    name: 'UserTodos',
    component: () =>
      import(/* webpackChunkName: "allTodos" */ '../views/UserTodos.vue'),
  },
  {
    path: '/add',
    name: 'AddTodo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "add" */ '../views/AddTodo.vue'),
  },
  {
    path: '/todo/:id',
    name: 'TodoDetails',
    component: () =>
      import(/* webpackChunkName: "todoDetails" */ '../views/TodoDetails.vue'),
  },
  {
    path: '/todo/modify/:id',
    name: 'ModifyTodo',
    component: () =>
      import(/* webpackChunkName: "todoDetails" */ '../views/ModifyTodo.vue'),
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () =>
      import(/* webpackChunkName: "signIn" */ '../views/SignIn.vue'),
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () =>
      import(/* webpackChunkName: "signIn" */ '../views/SignUp.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active-route',
  routes,
});

router.beforeEach((to, from, next) => {
  store.commit('Todos/unsetError');
  const token = store.getters['Auth/token'];
  console.log(to);
  if (!token && to.name !== 'SignIn' && to.path !== '/' && to.name !== 'SignUp') {
    return next({ name: 'SignIn' });
  }
  next();
});

export default router;
