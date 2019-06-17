import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: JSON.parse(sessionStorage.getItem('user')) || null,
  },
  mutations: {
    setLoginUser(state, payload) {
      state.loginUser = payload;
    },
  },
  actions: {
    logout({ commit }) {
      sessionStorage.removeItem('user');
      document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      commit('setLoginUser', null);
    },
    login({ commit }, user) {
      sessionStorage.setItem('user', JSON.stringify(user));
      commit('setLoginUser', user);
    },
  },
});
