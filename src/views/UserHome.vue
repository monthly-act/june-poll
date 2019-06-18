<template>
  <page-with-title-bar title="welcome">
    <h1>User Page</h1>

    <div class="room-list-wrapper">
      <chat-room-list v-if="rooms.length > 0" :rooms="rooms" />
      <md-empty-state
        v-else
        class="md-primary"
        md-icon="touch_app"
        md-label="welcome"
        md-description="Please create new room">
      </md-empty-state>
    </div>

    <div class="add-button-wrapper">
      <floating-add-button @click="onClickAddRoom"/>
    </div>

    <div class="add-dialog-wrapper" v-if="showDialog">
      <room-add-dialog
        :show-dialog="showDialog"
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

import { fetchRooms, createNewRoom } from '@/services/room-service';

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
    };
  },
  methods: {
    async fetchMyRooms() {
      this.rooms = await fetchRooms();
    },
    async saveMyRoom(room) {
      await createNewRoom(room);

      this.fetchMyRooms(room);
    },
    onClickAddRoom() {
      this.showDialog = true;
    },
    onSave({ link, title }) {
      this.showDialog = false;

      this.saveMyRoom({ link, title });
    },
    onCancel() {
      this.showDialog = false;
    },
  },
};
</script>

<style scoped lang="scss">
.room-list-wrapper {
  margin-top: 30px;
}
.add-button-wrapper {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
</style>
