<template>
  <textarea
    id="textarea"
    :placeholder="placeholder"
    :value="value"
    name="textarea"
    cols="40"
    rows="1"
    @input="input($event.target.value)">
  </textarea>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    autoresize: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    $textarea() {
      return document.getElementById('textarea');
    },
  },
  mounted() {
    this.resize();
  },
  methods: {
    input(value) {
      this.$emit('input', value);
      this.resize();
    },
    resize() {
      if (!this.autoresize) return;

      if (!this.value) {
        this.$textarea.style.height = '35px';
      }
      this.$textarea.style.height = `${this.$textarea.scrollHeight}px`;
    },
  },
};
</script>
<style scoped>
  textarea {
    width: 100%;
    height: 100%;
    border-radius: 1em;
    padding: .2em;
  }
</style>
