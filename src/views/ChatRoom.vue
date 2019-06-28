<template>
  <div class="room-wrapper">
    <md-toolbar class="toolbar-wrapper">
      <div class="connection-status">
        <img v-if="isLive" src="@/assets/junepoll_roomstate_connected.png">
        <img v-else src="@/assets/junepoll_roomstate_disconnected.png">
      </div>
      <div class="md-title">
        <span>{{title}}</span>
        <span>{{`접속: ${connectedUser} 명`}}</span>
      </div>
    </md-toolbar>

    <div class="message-list-wrapper">
      <message-item-list :messages="oldMessages" />
      <message-item-list :messages="messages" />
    </div>

    <div class="message-input-wrapper">
      <fieldset>
        <input id='feedback-like' type="radio" v-model="isGood" v-bind:value='true'>
        <label for='feedback-like'>Good</label>

        <input id='feedback-dislike' type="radio" v-model="isGood" v-bind:value='false'>
        <label for='feedback-dislike'>Bad</label>
      </fieldset>
      <md-field>
        <md-textarea v-model="message" md-autogrow/>
        <md-button class="md-icon-button" @click="sendMessage" :disabled="!isLive">
          <md-icon>send</md-icon>
        </md-button>
      </md-field>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import { fetchMessagesInRoom, fetchRoomByLink } from '@/services/room-service';
import { BACKEND_SOCKET_URL } from '@/constants/backend';
import uuidv4 from 'uuid/v4';

import MessageItemList from '@/components/molecules/MessageItemList.vue';


export default {
  components: { MessageItemList },
  data() {
    return {
      isLive: false,
      title: 'not found',
      isGood: true,
      message: '',
      oldMessages: [],
      messages: [],
      myName: '',
      connectedUser: 1,
    };
  },
  props: {
    roomId: {
      type: String,
      required: true,
    },
  },
  async mounted() {
    this.myName = uuidv4();

    const roomInfo = await fetchRoomByLink(this.roomId);
    if (roomInfo) {
      this.title = roomInfo.title;

      this.fetchOldMessages();

      this.onSocket();
    }
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.emit('disconnected');
    }
  },
  computed: {
    statusText() {
      return this.isGood ? 'GOOD' : 'BAD';
    },
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    async fetchOldMessages() {
      this.oldMessages = await fetchMessagesInRoom(this.roomId);
    },
    onSocket() {
      this.socket = io(BACKEND_SOCKET_URL, {
        query: `r_var=${this.roomId}`,
      });
      this.socket.on('connect', () => {
        this.isLive = true;
      });
      this.socket.on('connected_user_count', (count) => {
        this.connectedUser = count;
      });

      this.socket.on('message', ({
        id, status, msg, sender, createDate,
      }) => {
        this.messages.push({
          id, status, msg, sender, createDate,
        });
      });
    },
    sendMessage() {
      if (!this.message) return;

      this.socket.emit('message', {
        status: this.statusText,
        msg: this.message,
        sender: this.myName,
        roomId: this.roomId,
      }, (data) => {
        console.log(data);
        this.message = null;
      });
    },
    scrollToBottom() {
      const list = this.$el.querySelector('.message-list-wrapper');
      list.scrollTo({
        top: list.scrollHeight,
      });
    },
  },

};
</script>

<style scoped lang="scss">
@import '../styles/views/ChatRoom.scss';
</style>
