<template>
  <div class="input-wrapper">
    <a-label class="label-wrapper" :text="labelText"/>
    <a-input :value="value" @input="onChange"/>
    <span class="error-wrapper" v-show="errorMessage">{{errorMessage}}</span>
  </div>
</template>

<script>
import ALabel from '@/components/atoms/ALabel.vue';
import AInput from '@/components/atoms/AInput.vue';

export default {
  name: 'InputWithError',
  components: { AInput, ALabel },
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    labelText() {
      return this.required ? `${this.label} *` : this.label;
    },
  },
  methods: {
    onChange(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.label-wrapper {
  padding: 0 0 0.94em 0;
}
.error-wrapper {
  color: red;
  padding: 0.5em 0.94em;
}
</style>
