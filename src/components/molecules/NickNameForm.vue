<template>
  <div class="form-wrapper">
    <div class="logo-wrapper">LOGO HERE</div>

    <div class="nickname-wrapper">
      <div class="nickname-input-wrapper">
        <a-label class="nickname-label"
                 text="Nickname" />
        <div class="nickname-input">
          <a-input v-model="nickname" maxlength="10"/>
        </div>
      </div>

      <a-button
        class="button-wrapper"
        @click="onClickNext"
        :disabled="!nickname"
        text="Join"
      />
    </div>
  </div>
</template>

<script>
import AInput from '@/components/atoms/AInput.vue';
import ALabel from '@/components/atoms/ALabel.vue';
import AButton from '@/components/atoms/AButton.vue';

export default {
  components: {
    AInput,
    ALabel,
    AButton,
  },
  data() {
    return {
      nickname: '',
    };
  },
  methods: {
    onClickNext() {
      this.$emit('change', this.nickname);
    },
  },
};
</script>

<style scoped lang='scss'>
  .form-wrapper {
    width: 100vw;
    height: 100vh;
    padding: 0 7%;
  }
  .logo-wrapper {
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #707070;
    font-size: 28px;
  }
  .nickname-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    .nickname-input-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      .nickname-label {
        width: 100%;
        padding-left: 4%;
      }
      .nickname-input {
        border-radius: 2em;
        width: 100%;
        height: calc(2.25em + 1.88em);
        padding: 0.94em 0;
      }
    }
  }
  .button-wrapper {
    width: 100%;
    height: 2.25em;
  }
</style>
