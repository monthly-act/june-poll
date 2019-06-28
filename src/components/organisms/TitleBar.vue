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

<style scoped lang="scss">
@import '../../styles/components/titlebar.scss';
</style>
