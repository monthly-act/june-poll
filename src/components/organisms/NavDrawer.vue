<template>
  <!-- <md-drawer :md-active.sync="showNavigation"
             md-swipeable> -->

    <ul>
      <li>
        <login-menu-item @click="onClickLoginMenu"/>

      </li>
    </ul>
</template>

<script>

import LoginMenuItem from '@/components/organisms/LoginMenuItem.vue';

export default {
  components: { LoginMenuItem },
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
    onClickLoginMenu() {
      this.showNavigation = false;
    },
  },
};
</script>

