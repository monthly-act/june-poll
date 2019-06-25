<template>
  <div class="room-wrapper">
    <md-toolbar>
      <span id='connetion-status' v-bind:class="{ active: isLive }">connected: {{isLive}}</span>
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
      <fieldset>
        <input id='feedback-like' type="radio" v-model="isGood" v-bind:value='true'>
        <label for='feedback-like'>Good</label>

        <input id='feedback-dislike' type="radio" v-model="isGood" v-bind:value='false'>
        <label for='feedback-dislike'>Bad</label>
      </fieldset>
      <md-field>
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

import MessageItemList from '@/components/molecules/MessageItemList.vue';

export default {
  components: { MessageItemList },
  data() {
    return {
      isLive: true,
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
    messages: {
      type: Array,
      default: () => [],
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
$main-color: #1e1e2d;
$main-color-dark: #08090a;
$color-positive: #38375D;
$color-negative: #B9B9BE;
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
  background-color: $main-color-dark;
  box-shadow: 0 -1px 21px rgba(255, 255, 255, 0.1);
  padding: .8em;
  .md-field {
    padding-top: 0;
    margin-bottom: 0;
    > div {
      display: block;
      label {
        display: block !important;
        position: relative;
      }
    }
  }
}
textarea.md-textarea {
  max-height: 100px;
  background: #fff;
  padding: .65em;
  margin: .1em;
  border-radius: 2em;
  min-height: 41px;
}

button {
  height: inherit;
  > .md-ripple {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}

.md-icon-font {
  color: rgba(255,255,255,.7);
}

.md-toolbar {
  background-color: rgba(255,255,255,.6);
  min-height: 40px;
  padding: 0;
}

.md-title {
  font-size: .8em;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
}

.md-switch {
  color: #fdd;
  display: block;
}
fieldset {
  border: none;
  height: 50px;
  label {
    background: none;
    border-radius: 2em;
    display: inline-block;
    padding: .65em;
    width: 47%;
    &:hover{
    }
  }
  label[for=feedback-like] {
    background: $color-positive;
    color: #fff;
    margin-right: 1em;
  }
  label[for=feedback-dislike]{
    background: $color-negative;
  }

  input[type="radio"]{
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  input[type="radio"]:checked+label[for=feedback-like] {
    background: #292771;
    font-weight: 800;
  }
  input[type="radio"]:checked+label[for=feedback-dislike] {
    background: #e6e6e6;
    font-weight: 800;
  }
}

#connetion-status {
  background: url('../assets/faces.png') no-repeat 0 0;
  width: 12px;
  height: 12px;
  text-indent: -999em;
  border: 1px solid #fff;
  &.active{
    border: 1px solid yellowgreen;
  }
}
</style>
