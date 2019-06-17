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

<style scoped>
  .page-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .content {
    width: 100%;
    height: 100%;
    padding: 20px;
    color: #ffffff;
  }
</style>
