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
        <textarea v-model="message" cols="40" rows='1'></textarea>
        <!-- <input id='feedback-question' type="radio" v-model="messageType" v-bind:value='true'>
        <label for='feedback-question'>Question</label>
        <input id='feedback-like' type="radio" v-model="isGood" v-bind:value='true'>
        <label for='feedback-like'>Good</label>
        <input id='feedback-dislike' type="radio" v-model="isGood" v-bind:value='false'>
        <label for='feedback-dislike'>Bad</label> -->
        <div id='btn-submit-wrapper'>
          <button class='btn-submit' id='btn-question' @click="sendMessage(MessageType = 'question')" :disabled="!isLive">Question</button>
          <button class='btn-submit' id='btn-negative' @click="sendMessage(MessageType = 'negative')" :disabled="!isLive">Dislike</button>
          <button class='btn-submit' id='btn-positive' @click="sendMessage(MessageType = 'positive')" :disabled="!isLive">Like</button>
        </div>
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
      MessageType: ''
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

    const roomInfo = {};//await fetchRoomByLink(this.roomId);
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
    MessageType() {
      console.log('checking is good ???', this.isGood);
      if (this.messageType === 'positive') {
        return 'GOOD';
      } else if (this.messageType === 'negative') {
        return 'BAD';
      } else if (this.messageType === 'question') {
        return 'QQ';
      }
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
        console.log(this.messages);

      });
    },
    sendMessage(msgType) {
      console.log('show me the msgType :::: ' , msgType);
      
      if (!this.message) return;

      console.log('/////', this.statusText, this.message, this.myName, this.roomId);
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

fieldset {
  padding: 0;
}

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
  // margin-top: 40px;
  padding: 10px 0;
  overflow-y: scroll;
}

.message-input-wrapper {
  width: 100%;
  background-color: $main-color-dark;
  box-shadow: 0 -1px 21px rgba(255, 255, 255, 0.1);
  padding: 10px;
  fieldset {
    padding-top: 0;
    margin-bottom: 0;
    textarea {
      max-height: 5em;
      background: #fff;
      margin: 0.1em 0 .5em;
      border-radius: 1em;
      width: calc(100vw - 20px);
      padding: .2em;
      min-height: 2em;
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
  label {
    background: none;
    border-radius: 1.5em;
    display: inline-block;
    font-size: 13px;
    height: 32px;
    padding: .7em;
    text-align: center;
    width: 30%;
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
  label[for=feedback-question]{
    border: 1px solid #fff;
    color: #fff;
    margin-right: 1em;

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


/// 

#btn-submit-wrapper {
  display: flex;
  justify-content: center;
  > .btn-submit {
    border-radius: 2em;
    color: #fff;
    font-size: 13px;
    height: 32px;
    width: calc((100vw - 40px)/3);
    &:not(last-child) {
      margin-right: 10px;
    }
  }
  #btn-positive {
    background-color: $chat-color-positive;
    border: none;
  }
  #btn-negative {
    background-color: $chat-color-negative;
    border: none;
  }
  #btn-question {
    background: none;
    border: 1px solid #fff;
  }
}
</style>
