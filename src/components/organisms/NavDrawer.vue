<template>
  <md-drawer :md-active.sync="showNavigation"
             md-swipeable>
    <md-list>
      <md-list-item>
        <login-menu-item @click="onClickLoginMenu"/>
      </md-list-item>
      <md-divider></md-divider>
    </md-list>
  </md-drawer>
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

