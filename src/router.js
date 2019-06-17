import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import UserHome from '@/views/UserHome.vue';
import LoginSuccess from '@/views/LoginSuccess.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/user-home',
      name: 'user-home',
      component: UserHome,
      meta: { authRequired: true },
    },
    {
      path: '/login/success',
      name: 'loginSuccess',
      component: LoginSuccess,
    },
  ],
});
