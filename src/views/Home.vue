<template>
  <page-with-title-bar title="welcome">
    <div class="join-wrapper">
      <md-field>
        <label>Room Id</label>
        <md-input v-model="roomId" />
      </md-field>
      <md-button
        class="md-accent"
        @click="onClickJoin"
        :disabled="!roomId"
      >
        JOIN
      </md-button>
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

<style scoped>
.join-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 50px;
  width: 100%;
  height: calc(100% - 150px);
}
</style>
