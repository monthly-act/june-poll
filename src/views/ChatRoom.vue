<template>
  <div class="room-wrapper">
    <div class="toolbar-wrapper">
      <div class="connection-status">
        <img v-if="isLive" src="@/assets/junepoll_roomstate_connected.png">
        <img v-else src="@/assets/junepoll_roomstate_disconnected.png">
      </div>
      <div class="connection-bar-title">
        <span>{{title}}</span>
        <span>{{`접속: ${connectedUser} 명`}}</span>
      </div>
    </div>

    <div class="message-list-wrapper">
      <message-item-list :messages="oldMessages" />
      <message-item-list :messages="messages" />
    </div>

    <div class="message-input-wrapper">
      <fieldset>
        <textarea v-model="message" cols="40"></textarea>
        <input id='feedback-like' type="radio" v-model="isGood" v-bind:value='true'>
        <label for='feedback-like'>Good</label>
        <input id='feedback-dislike' type="radio" v-model="isGood" v-bind:value='false'>
        <label for='feedback-dislike'>Bad</label>
        <button @click="sendMessage" :disabled="!isLive">send</button>
      </fieldset>
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

<style scoped lang='scss'>
.room-wrapper {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

.toolbar-wrapper {
  background-color: $main-color-dark;
}

.message-list-wrapper {
  flex: 1;
  margin-top: 40px;
  padding: 10px 0;
  overflow-y: scroll;
}

.message-input-wrapper {
  width: 100%;
  background-color: $main-color-dark;
  box-shadow: 0 -1px 21px rgba(255, 255, 255, 0.1);
  padding: .8em;
  fieldset {
    padding-top: 0;
    margin-bottom: 0;
    textarea {
      max-height: 100px;
      background: #fff;
      margin: .1em;
      border-radius: 2em;
      height: 1.5em;
      width: 100%;
    }
    > div {
      display: block;
      label {
        display: block !important;
        position: relative;
      }
    }
  }
}



button {
  height: inherit;
  // > .md-ripple {
  //   position: absolute;
  //   top: 50%;
  //   transform: translateY(-50%);
  // }
}

.connection-bar-title {
  flex: 1;
  font-size: 1em;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
}

fieldset {
  border: none;
  height: 50px;
  label {
    background: none;
    border-radius: 2em;
    display: inline-block;
    padding: .65em;
    width: 40%;
    &:hover{
    }
  }
  label[for=feedback-like] {
    background: $chat-color-positive;
    color: #fff;
    margin-right: 1em;
  }
  label[for=feedback-dislike]{
    background: $chat-color-negative;
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

.connection-status {
  width: 20px;
  height: 20px;
  margin: 0 10px;
  img {
    height: 20px;
    width: 20px;
    margin: 0 10px;
  }
}
</style>
