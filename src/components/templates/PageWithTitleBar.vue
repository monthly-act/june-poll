<template>
  <div>
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
  .content {
    padding: 20px;
    color: #ffffff;
  }
</style>
