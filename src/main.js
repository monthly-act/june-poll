import Vue from 'vue';
import {
  MdDrawer,
  MdIcon,
  MdButton,
} from 'vue-material/dist/components';

import App from './App.vue';
import router from './router';
import store from './store';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/black-green-dark.css';

Vue.config.productionTip = false;
Vue.use(MdDrawer);
Vue.use(MdIcon);
Vue.use(MdButton);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
