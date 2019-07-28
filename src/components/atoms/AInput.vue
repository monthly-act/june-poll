<template>
  <input class="input-wrapper"
         :placeholder="placeholder"
         :value="value"
         @change="onChange">
</template>

<script>
export default {
  name: 'AInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  methods: {
    onChange(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>

<style scoped lang="scss">
.input-wrapper {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 2em;
  padding: .5625em 1.25em;
  font-size: 0.875em;
  color: #959595;

  &:focus {
    outline: none;
  }
}
</style>
