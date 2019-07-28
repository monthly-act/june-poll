<template>
  <div class="title-bar-wrapper">
    <div class="user-name">{{loginUser.name}}</div>
  </div>
</template>

<script>

export default {
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
  background-color: #fdd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.user-name {
  margin-right: 10px;
  color: white;
}
</style>
