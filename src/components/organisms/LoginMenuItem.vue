<template>
  <div class="login-wrapper">
    <div class="user-info-wrapper">
      <md-avatar v-if="pictureUrl" class="md-small" style="margin: 0;">
        <img :src="pictureUrl" alt="avatar" />
      </md-avatar>
      <md-icon v-else>account_circle</md-icon>
      <div class="user-email">{{email}}</div>
    </div>
    <div class="button-wrapper">
      <span v-if="isLogin"
            @click="onClickLogout">
        Sign out
      </span>
      <span v-else
            @click="onClickGoogleLogin">
        Sign in with Google
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginMenuItem',
  computed: {
    isLogin() {
      return !!this.email;
    },
    loginUser() {
      return this.$store.state.loginUser || {};
    },
    email() {
      return this.loginUser.email;
    },
    pictureUrl() {
      return this.loginUser.picture;
    },
  },
  methods: {
    onClickGoogleLogin() {
      window.open('http://localhost:3001/api/auth/google', '_self');
      this.$emit('click');
    },
    async onClickLogout() {
      await fetch('http://localhost:3001/api/auth/logout');

      this.$store.dispatch('logout');
      this.$router.push('/?logout');

      this.$emit('click');
    },
  },
};
</script>

<style scoped lang="scss">
.login-wrapper {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user-info-wrapper {
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  .user-email {
    margin-left: 10px;
  }
}

.button-wrapper {
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  text-decoration: underline;
}
</style>
