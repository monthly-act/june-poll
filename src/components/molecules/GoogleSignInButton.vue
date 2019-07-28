<template>
  <a-button
    class="google-button-wrapper"
    text="Sign in with Google"
    @click="onClick"
  >
    <img class="google-signin-image"
         src="@/assets/ic-google.png" />
  </a-button>
</template>

<script>
import AButton from '@/components/atoms/AButton.vue';

export default {
  name: 'GoogleSignInButton',
  components: { AButton },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped lang="scss">
.google-button-wrapper {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #707070;

  .google-signin-image {
    width: 18px;
    height: 18px;
    margin-right: 24px;
  }
}
</style>
