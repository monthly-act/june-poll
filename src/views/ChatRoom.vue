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
           v-for="msg in messages"
           :key="msg.id">
        <md-chip class="my-primary">{{msg.status}} > {{msg.msg}}</md-chip>
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
import io from 'socket.io-client';

export default {
  data() {
    return {
      title: 'welcome',
      isConnected: false,
      message: '',
      isGood: true,
      messages: [],
    };
  },
  props: {
    roomId: {
      type: String,
      required: true,
    },
  },
  mounted() {
    const {
      protocol,
      hostname,
    } = window.location;
    const port = process.env.VUE_APP_SOCKET_PORT;

    this.socket = io(`${protocol}//${hostname}:${port}/rooms/${this.roomId}`);

    this.socket.on('connect', () => {
      console.log('connected');
    });

    this.socket.on('new_message', ({ id, status, msg }) => {
      this.messages.push({ id, status, msg });
    });
  },
  destroyed() {
    this.socket.emit('disconnect');
    console.log('disconnected');
  },
  computed: {
    statusText() {
      return this.isGood ? 'GOOD' : 'BAD';
    },
  },
  methods: {
    sendMessage() {
      if (!this.message) return;

      this.socket.emit('message', { status: this.statusText, msg: this.message });
      this.message = null;
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
