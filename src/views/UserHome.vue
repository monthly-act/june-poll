<template>
  <page-with-title-bar title="welcome">
    <h1>User Page</h1>

    <div class="room-list-wrapper">
      <chat-room-list v-if="rooms.length > 0" :rooms="rooms" />
      <div v-else>
        Please create new room
      </div>
    </div>

    <div class="add-button-wrapper">
      <floating-add-button @click="onClickAddRoom"/>
    </div>

    <div class="add-dialog-wrapper" v-if="showDialog">
      <room-add-dialog
        :show-dialog="showDialog"
        :error-message="errorMessage"
        @cancel="onCancel"
        @save="onSave"
      />
    </div>
  </page-with-title-bar>
</template>

<script>
import FloatingAddButton from '@/components/molecules/FloatingAddButton.vue';
import ChatRoomList from '@/components/organisms/ChatRoomList.vue';
import RoomAddDialog from '@/components/organisms/RoomAddDialog.vue';
import PageWithTitleBar from '@/components/templates/PageWithTitleBar.vue';

import { fetchRooms, fetchRoomByLink, createNewRoom } from '@/services/room-service';

export default {
  components: {
    RoomAddDialog,
    ChatRoomList,
    FloatingAddButton,
    PageWithTitleBar,
  },
  mounted() {
    this.fetchMyRooms();
  },
  data() {
    return {
      rooms: [],
      showDialog: false,
      errorMessage: '',
    };
  },
  methods: {
    async fetchMyRooms() {
      this.rooms = await fetchRooms();
    },
    async saveMyRoom(room) {
      const existRoom = await fetchRoomByLink(room.link);
      if (existRoom) {
        return { msg: 'the link is existed' };
      }

      await createNewRoom(room);

      this.fetchMyRooms(room);
      return null;
    },
    onClickAddRoom() {
      this.showDialog = true;
    },
    async onSave({ link, title }) {
      const err = await this.saveMyRoom({ link, title });
      if (err) {
        this.errorMessage = err.msg;
      } else {
        this.showDialog = false;
      }
    },
    onCancel() {
      this.showDialog = false;
    },
  },
};
</script>

<style scoped lang='scss'>
.room-list-wrapper {
  margin-top: 30px;
  max-height: 70%;
  overflow: scroll;
}
.add-button-wrapper {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
</style>
