<template>
  <div
    :class="['btn-wrapper', {disabled}]"
    @click.self="onClick"
  >
    <slot></slot>
    {{text}}
  </div>
</template>

<script>
export default {
  name: 'AButton',
  props: {
    text: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      if (this.disabled) return;

      this.$emit('click');
    },
  },
};
</script>

<style scoped lang="scss">
  .btn-wrapper {
    width: 100%;
    height: 100%;
    background-color: $main-color-dark;
    border: 1px solid $main-color-dark;
    border-radius: 2em;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &.disabled {
      background-color: #707070;
    }
  }
</style>
