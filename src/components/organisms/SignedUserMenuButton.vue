<template>
  <speed-dial :items="filterdMenuItems" @click="onClickMenuItem"/>
</template>

<script>
import SpeedDial from '@/components/molecules/SpeedDial.vue';

export default {
  name: 'SignedUserMenuButton',
  components: { SpeedDial },
  props: {
    filters: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    menuItems() {
      return [
        { key: 'JOIN_ROOM', text: 'Join a presentation' },
        { key: 'MY_PAGE', text: 'My page' },
        { key: 'CREATE_ROOM', text: 'Create a room' },
        { key: 'SIGN_OUT', text: 'Sign out' },
      ];
    },
    filterdMenuItems() {
      return this.menuItems.filter(({ key }) => !this.filters.includes(key));
    },
  },
  methods: {
    onClickMenuItem(type) {
      switch (type) {
        case 'SIGN_OUT':
          this.$store.dispatch('logout');
          this.$router.push('/');
          break;
        case 'CREATE_ROOM':
          this.$router.push('/new-room');
          break;
        case 'JOIN_ROOM':
          this.$router.push('/');
          break;
        case 'MY_PAGE':
          this.$router.push('/user-home');
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>

</style>
