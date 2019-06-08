<template>
  <md-drawer :md-active.sync="showNavigation"
             md-swipeable>
    <div @click="onClickToRouteLogin">Login</div>
  </md-drawer>
</template>

<script>

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show(newValue) {
      this.showNavigation = newValue;
    },
    showNavigation(newValue) {
      if (!newValue) {
        this.$emit('close');
      }
    },
  },
  data() {
    return {
      showNavigation: this.show,
    };
  },
  methods: {
    onClickToRouteLogin() {
      this.showNavigation = false;
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
</style>
