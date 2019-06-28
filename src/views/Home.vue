<template>
  <page-with-title-bar title="welcome">
    <div class="join-wrapper">
      <fieldset>
        <label>Join a presentation</label>
        <input v-model="roomId" />
      </fieldset>
      <button
        class="btn-primary"
        @click="onClickJoin"
        :disabled="!roomId"
      >
        JOIN
      </button>
    </div>
  </page-with-title-bar>
</template>

<script>
import PageWithTitleBar from '@/components/templates/PageWithTitleBar.vue';

export default {
  components: {
    PageWithTitleBar,
  },
  data() {
    return {
      roomId: '',
    };
  },
  methods: {
    onClickJoin() {
      this.$router.push(`/room/${this.roomId}`);
    },
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/views/home.scss';
</style>
