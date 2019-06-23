<template>
  <div class="room-wrapper">
    <md-toolbar>
      <h3 class="md-title" style="flex: 1">{{title}}</h3>
      <md-button class="md-icon-button">
        <md-icon>more_vert</md-icon>
      </md-button>
    </md-toolbar>

    <div class="message-list-wrapper">
      <div class="message-item"
           v-for="msg in oldMessages"
           :key="msg.id">
        <md-chip class="my-primary">
          {{msg.sender}} > {{msg.status}} > {{msg.msg}} > {{msg.create_date | date_format}}
        </md-chip>
      </div>

      <div class="message-item"
           v-for="msg in messages"
           :key="msg.id">
        <md-chip class="my-primary">
          {{msg.sender}} > {{msg.status}} > {{msg.msg}} > {{msg.create_date | date_format}}
        </md-chip>
      </div>
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
import moment from 'moment';
import io from 'socket.io-client';
import { fetchMessagesInRoom } from '../services/room-service';

export default {
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
  filters: {
    date_format(value) {
      return moment(value).format('hh:mm:ss');
    },
  },
  computed: {
    statusText() {
      return this.isGood ? 'GOOD' : 'BAD';
    },
    socketUrl() {
      const {
        protocol,
        hostname,
      } = window.location;
      const socketPort = process.env.VUE_APP_SOCKET_PORT;

      return `${protocol}//${hostname}:${socketPort}/`;
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
      this.socket = io(this.socketUrl, {
        query: `r_var=${this.roomId}`,
      });
      this.socket.on('connect', () => {
        console.log('connected');
      });

      this.socket.on('message', ({
        id, status, msg, sender, create_date,
      }) => {
        this.messages.push({
          id, status, msg, sender, create_date,
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
        behavior: 'smooth',
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
.message-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: fit-content;
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
