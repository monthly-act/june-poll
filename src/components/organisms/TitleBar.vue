<template>
  <div class="title-bar-wrapper">
    <div class="title">{{title}}</div>
    <div class="user-info">
      {{loginUser.name}}
<!--      <img class="user-image" :src="loginUser.picture" />-->
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    loginUser() {
      return this.$store.state.loginUser || {};
    },
  },
};
</script>

<style scoped lang='scss'>
.title-bar-wrapper {
  width: 100vw;
  height: 50px;
  background-color: #08090a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  color: white;
  padding: 0 1.4375em;
}
.title {
  font-size: 1.25em;
}
.user-info {
  display: flex;
  justify-content: center;
  align-items: center;

  .user-image {
    width: 37px;
    height: 34px;
    padding-left: 3px;
    border-radius: 50%;
  }
}
</style>
