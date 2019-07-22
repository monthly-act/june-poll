<template>
  <div class="title-bar-wrapper">
    <div class="menu-button-wrapper">
      <menu-button @click="onClickMenu" />
    </div>
    <div class="user-name">{{loginUser.name}}</div>
    <nav-drawer :show="isShowing" @close="onClose"/>
  </div>
</template>

<script>
import NavDrawer from '@/components/organisms/NavDrawer.vue';
import MenuButton from '@/components/molecules/MenuButton.vue';

export default {
  components: { MenuButton, NavDrawer },
  data() {
    return {
      isShowing: false,
    };
  },
  computed: {
    loginUser() {
      return this.$store.state.loginUser || {};
    },
  },
  methods: {
    onClickMenu() {
      this.isShowing = true;
    },
    onClose() {
      this.isShowing = false;
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
.menu-button-wrapper {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-name {
  margin-right: 10px;
  color: white;
}
</style>
