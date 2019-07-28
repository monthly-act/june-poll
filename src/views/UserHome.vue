<template>
  <page-with-title-bar title="Presentations">
    <div class="room-list-wrapper">
      <chat-room-list v-if="rooms.length > 0" :rooms="rooms" />
      <div v-else class="empty-list-state">
        Please create new room
      </div>
    </div>

    <div class="add-button-wrapper">
      <signed-user-menu-button :filters="['MY_PAGE']"/>
    </div>
  </page-with-title-bar>
</template>

<script>
import ChatRoomList from '@/components/organisms/ChatRoomList.vue';
import PageWithTitleBar from '@/components/templates/PageWithTitleBar.vue';
import SignedUserMenuButton from '@/components/organisms/SignedUserMenuButton.vue';

import { fetchRooms } from '@/services/room-service';

export default {
  components: {
    SignedUserMenuButton,
    ChatRoomList,
    PageWithTitleBar,
  },
  mounted() {
    this.fetchMyRooms();
  },
  data() {
    return {
      rooms: [],
    };
  },
  methods: {
    async fetchMyRooms() {
      this.rooms = await fetchRooms();
    },
  },
};
</script>

<style scoped lang='scss'>
.room-list-wrapper {
  width: 100%;
  height: fit-content;
  padding-bottom: 2em;
}

.empty-list-state {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 1.25em;
}
.speed-dial-wrapper {
  position: fixed;
  bottom: 1.1875em;
  right: 1.1875em;
  width: 100%;
  height: fit-content;
}
</style>
