<template>
  <div class="title-bar-wrapper">
    <div class="menu-button-wrapper">
      <menu-button @click="onClickMenu" />
    </div>
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
.title-bar-wrapper {
  width: 100vw;
  height: 50px;
  background-color: black;
  display: flex;
  justify-content: flex-start;
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
</style>
