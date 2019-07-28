<template>
  <div class="home-wrapper">
    <div class="logo-wrapper">LOGO HERE</div>

    <div class="join-wrapper">
      <div class="room-input-wrapper">
        <a-label class="room-label"
                 text="Join a presentation" />
        <div class="room-input">
          <prefix-input v-model="roomId" prefix="room/"/>
        </div>
      </div>

      <a-button
        class="button-wrapper"
        @click="onClickJoin"
        :disabled="!roomId"
        text="Join"
      />
    </div>
    <div class="signin-wrapper" v-if="!isSignedIn">
      <a-label class="or-label" text="or" />
      <google-sign-in-button
        class="button-wrapper"
        @click="onClickSignIn" />
    </div>
    <div class="speed-dial-wrapper" v-else>
      <signed-user-menu-button :filters="['JOIN_ROOM']"/>
    </div>
  </div>
</template>

<script>
import ALabel from '@/components/atoms/ALabel.vue';
import AButton from '@/components/atoms/AButton.vue';
import PrefixInput from '@/components/molecules/PrefixInput.vue';
import GoogleSignInButton from '@/components/molecules/GoogleSignInButton.vue';
import SignedUserMenuButton from '@/components/organisms/SignedUserMenuButton.vue';

import { BACKEND_WEB_URL } from '@/constants/backend';
import { mapGetters } from 'vuex';

export default {
  components: {
    SignedUserMenuButton,
    PrefixInput,
    ALabel,
    AButton,
    GoogleSignInButton,
  },
  data() {
    return {
      roomId: '',
    };
  },
  computed: {
    ...mapGetters({
      isSignedIn: 'isSignedIn',
    }),
  },
  methods: {
    onClickJoin() {
      this.$router.push(`/room/${this.roomId}`);
    },
    onClickSignIn() {
      window.open(`${BACKEND_WEB_URL}/api/auth/google`, '_self');
    },
  },
};
</script>

<style scoped lang='scss'>
.home-wrapper {
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
.join-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  .room-input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    .room-label {
      width: 100%;
      padding-left: 4%;
    }
    .room-input {
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

.signin-wrapper {
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .or-label {
    text-align: center;
    padding: 40px 0;
  }
}

.speed-dial-wrapper {
  position: fixed;
  bottom: 1.1875em;
  right: 1.1875em;
  width: 100%;
  height: fit-content;
}
</style>
