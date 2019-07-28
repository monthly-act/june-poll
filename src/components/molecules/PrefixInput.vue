<template>
  <div class="wrapper">
    <div class="prefix-wrapper">{{prefix}}</div>
    <a-input class="input" :value="value" @input="onChange"/>
  </div>
</template>

<script>
import AInput from '@/components/atoms/AInput.vue';

export default {
  name: 'PrefixInput',
  components: { AInput },
  props: {
    value: {
      type: String,
      default: '',
    },
    prefix: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  methods: {
    onChange(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 2em;
  background-color: white;
}

.prefix-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  padding: .5625em 0 .5625em 1.25em;
  font-size: 0.875em;
  color: #959595;
  background-color: white;
  border-top-left-radius: 2em;
  border-bottom-left-radius: 2em;
}

.input-wrapper {
  padding-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
