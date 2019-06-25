<template>
  <page-with-title-bar title="welcome">
    <div class="join-wrapper">
      <field>
        <label>Join a presentation</label>
        <input v-model="roomId" />
      </field>
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
$main-color-dark: #08090a;

.join-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  width: 100%;
  height: calc(100% - 150px);
  field {
    margin: 0 0 .8em;
  }
  label,
  input,
  button {
    display: block;
    font-size: 1em;
    width: 80%;
    margin: 0 auto;
  }
  label {
    text-align: left;
  }
  input {
    border: 1px solid #fff;
    border-radius: 2em;
    padding: .25em .75em .35em;
  }
  .btn-primary {
    background-color: $main-color-dark;
    border: 1px solid $main-color-dark;
    border-radius: 2em;
    color: #fff;
    padding: .4em;
  }
}
</style>
