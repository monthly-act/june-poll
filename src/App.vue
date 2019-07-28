<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
};
</script>
<style lang="scss">
@import '@/styles/global.scss';
* {
  &::-webkit-scrollbar {
    width: 2px;
    background: none;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
}
</style>
