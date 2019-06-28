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
@import '../../styles/components/PageWithTitleBar.scss';
</style>
