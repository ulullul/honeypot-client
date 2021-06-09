import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import axios from 'axios';
import api from './../api/index';
import Toasted from 'vue-toasted';

Vue.use(Toasted);

Vue.use(VueMaterial);

Vue.material.linkActiveClass = 'active-route';

Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV === 'development';
Vue.prototype.$http = axios;
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
