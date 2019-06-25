<template>
  <div class="room-wrapper">
    <md-toolbar>
      <h3 class="md-title" style="flex: 1">{{title}}</h3>
      <md-button class="md-icon-button">
        <md-icon>more_vert</md-icon>
      </md-button>
    </md-toolbar>

    <div class="message-list-wrapper">
      <message-item-list :messages="oldMessages" />
      <message-item-list :messages="messages" />
    </div>

    <div class="message-input-wrapper">
      <md-field>
        <md-switch v-model="isGood">{{statusText}}</md-switch>
        <md-textarea v-model="message" md-autogrow/>
        <md-button class="md-icon-button" @click="sendMessage">
          <md-icon>send</md-icon>
        </md-button>
      </md-field>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import { fetchMessagesInRoom } from '@/services/room-service';
import { BACKEND_SOCKET_URL } from '@/constants/backend';

import MessageItemList from '@/components/molecules/MessageItemList.vue';

export default {
  components: { MessageItemList },
  data() {
    return {
      title: 'welcome',
      isGood: true,
      message: '',
      oldMessages: [],
      messages: [],
    };
  },
  props: {
    roomId: {
      type: String,
      required: true,
    },
    myName: {
      type: String,
      default: 'unknwon',
    },
  },
  async mounted() {
    this.fetchOldMessages();

    this.onSocket();
  },
  beforeDestroy() {
    console.log('disconnected');
    this.socket.emit('disconnected');
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
        console.log('connected');
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
        sender: 'test',
        roomId: this.roomId,
      });
      this.message = null;
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
.room-wrapper {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
.message-list-wrapper {
  flex: 1;
  overflow: scroll;
}

.message-input-wrapper {
  background-color: black;
  padding: 10px 10px;
  .md-field {
    padding-top: 0;
    margin-bottom: 0;
  }
}
textarea.md-textarea {
  max-height: 100px;
}
</style>
