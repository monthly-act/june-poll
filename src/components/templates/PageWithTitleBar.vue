<template>
  <div class="page-wrapper">
    <title-bar class="title-wrapper" :title="title"/>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TitleBar from '@/components/organisms/TitleBar.vue';

export default {
  components: {
    TitleBar,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped lang='scss'>
.page-wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.title-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
}
.content {
  background-color: $main-color;
  width: 100%;
  height: 100%;
  color: #ffffff;
  padding-top: 50px;
}
</style>
