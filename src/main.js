import Vue from 'vue';
import VueMaterial from 'vue-material';

import App from './App.vue';
import router from './router';
import store from './store';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/black-green-dark.css';

Vue.config.productionTip = false;
Vue.use(VueMaterial);

router.beforeEach((to, from, next) => {
  if (to.matched.some(routeInfo => routeInfo.meta.authRequired)) {
    if (!store.state.loginUser) {
      router.push('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
