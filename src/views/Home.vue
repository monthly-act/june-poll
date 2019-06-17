<template>
  <page-with-title-bar title="welcome">
    <h1>welcome</h1>
    <div class="join-wrapper">
      <span class="domain-wrapper">chat.monthly-ki.com/</span>
      <md-field>
        <md-input
          v-model="initial"
          placeholder="room-id"
        />
      </md-field>
    </div>
    <md-button class="md-accent">JOIN</md-button>
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
      initial: '',
    };
  },
};
</script>

<style scoped>
  .join-wrapper {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    padding: 50px 10px 0 10px;
    width: 100%;
  }

  .domain-wrapper {
    display: flex;
    align-items: center;
    padding-right: 10px;
    white-space: nowrap;
    font-size: 16px;
    height: 32px;
    color: gray;
  }
  .md-field {
    margin: 0;
    width: 130px;
  }
</style>
