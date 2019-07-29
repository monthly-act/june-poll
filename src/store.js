import Vue from 'vue';
import Vuex from 'vuex';
import uuidv4 from 'uuid/v4';
import { BACKEND_WEB_URL } from './constants/backend';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: JSON.parse(sessionStorage.getItem('user')) || null,
    sender: JSON.parse(localStorage.getItem('sender')) || { nickname: null },
  },
  getters: {
    isSignedIn: state => !!state.loginUser,
  },
  mutations: {
    setLoginUser(state, payload) {
      state.loginUser = payload;
    },
    setSender(state, payload) {
      state.sender = payload;
    },
  },
  actions: {
    async logout({ commit }) {
      await fetch(`${BACKEND_WEB_URL}/api/auth/logout`);

      sessionStorage.removeItem('user');
      document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      commit('setLoginUser', null);
    },
    login({ commit }, user) {
      sessionStorage.setItem('user', JSON.stringify(user));
      commit('setLoginUser', user);
    },
    saveSender({ commit }, roomId, nickname) {
      const sender = {
        roomId,
        nickname,
        id: uuidv4(),
      };
      localStorage.setItem('sender', JSON.stringify(sender));
      commit('setSender', sender);
    },
  },
});
