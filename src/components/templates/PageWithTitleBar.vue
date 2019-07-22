<template>
  <div class="page-wrapper">
    <title-bar :title="title"/>
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
.content {
  background-color: $main-color;
  width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  color: #ffffff;
}
</style>
