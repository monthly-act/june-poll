<template>
  <label class="label-wrapper">{{text}}</label>
</template>

<script>
export default {
  name: 'ALabel',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.label-wrapper {
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #ffffff;
}
</style>
