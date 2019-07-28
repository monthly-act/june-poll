<template>
  <page-with-title-bar title="Create New Room">
    <div class="new-room-wrapper">
      <div class="room-info-wrapper">
        <input-with-error label="Room Name"
                          v-model="title"
                          required/>
        <input-with-error label="Link Url"
                         v-model="link"
                         :error-message="errorMessage"
                         required/>
      </div>
      <a-button class="button-wrapper"
                text="Save"
                @click="onClickSave"
                :disabled="!isFilled"/>
    </div>
  </page-with-title-bar>
</template>

<script>
import AButton from '@/components/atoms/AButton.vue';
import InputWithError from '@/components/molecules/InputWithError.vue';
import PageWithTitleBar from '@/components/templates/PageWithTitleBar.vue';

import { generateUrl } from '@/utils/uuid-util';
import { fetchRoomByLink, createNewRoom } from '@/services/room-service';

export default {
  name: 'NewRoom',
  components: {
    InputWithError, AButton, PageWithTitleBar,
  },
  mounted() {
    this.generateRoomUrl();
  },
  data() {
    return {
      errorMessage: '',
      title: null,
      link: null,
    };
  },
  computed: {
    userId() {
      return this.$store.state.loginUser.email.split('@')[0];
    },
    isFilled() {
      return !!this.title && !!this.link;
    },
  },
  methods: {
    generateRoomUrl() {
      this.link = generateUrl(this.userId);
    },
    async onClickSave() {
      const { title, link } = this;
      const existRoom = await fetchRoomByLink(link);
      if (existRoom) {
        this.errorMessage = 'the link is existed';
      } else {
        this.errorMessage = '';
      }

      await createNewRoom({ title, link });

      this.$router.push('/user-home');
    },
  },
};
</script>

<style scoped lang="scss">
.new-room-wrapper {
  width: 100%;
  height: 100%;
  padding: 10% 7%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.room-info-wrapper {
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.button-wrapper {
  width: 100%;
  height: 2.25em;
}
</style>
