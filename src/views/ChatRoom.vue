<template>
  <div>
    <div class="nickname-wrapper" v-if="!nickname">
      <nick-name-form @change="onChangeNickname"/>
    </div>
    <div class="room-wrapper" v-else>
      <div class="toolbar-wrapper">
        <div class="connection-status">
          <img v-if="isLive" src="@/assets/junepoll_roomstate_connected.png">
          <img v-else src="@/assets/junepoll_roomstate_disconnected.png">
        </div>
        <div class="connection-bar-title">
          <span>{{title}}</span>
          <span class='show-owner' :class="['owner-wrapper',
                  {'show-owner': isOwner }]">👑</span>
          <span>{{`접속: ${connectedUser} 명`}}</span>
        </div>
        <more-button class="more-button-wrapper" :items="moreItems" @click="onClickMoreItem"/>
      </div>

      <div class="message-list-wrapper">
        <message-item-list :messages="oldMessages" />
        <message-item-list :messages="messages" />
      </div>

      <div v-show="!isPresentationMode" class="message-input-wrapper">
        <fieldset>
          <a-textarea class="message-input" v-model="message" autoresize/>
          <div id='btn-submit-wrapper'>
            <button class='btn-submit' id='btn-question'
                    @click="sendMessage(itsMessageType = 'question')"
                    :disabled="!isLive">
              Question
            </button>
            <button class='btn-submit' id='btn-negative'
                    @click="sendMessage(itsMessageType = 'negative')"
                    :disabled="!isLive">
              Dislike
            </button>
            <button class='btn-submit' id='btn-positive'
                    @click="sendMessage(itsMessageType = 'positive')"
                    :disabled="!isLive">
              Like
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import ATextarea from '@/components/atoms/ATextarea.vue';
import NickNameForm from '@/components/molecules/NickNameForm.vue';
import MessageItemList from '@/components/molecules/MessageItemList.vue';
import MoreButton from '@/components/molecules/MoreButton.vue';

import io from 'socket.io-client';
import { fetchMessagesInRoom, fetchRoomByLink } from '@/services/room-service';
import { BACKEND_SOCKET_URL } from '@/constants/backend';
import { mapState } from 'vuex';

export default {
  components: {
    MoreButton, ATextarea, NickNameForm, MessageItemList,
  },
  data() {
    return {
      isLive: false,
      title: 'Not found',
      owner: null,
      message: '',
      oldMessages: [],
      messages: [],
      connectedUser: 1,
      itsMessageType: '',
      isPresentationMode: false,
    };
  },
  props: {
    roomId: {
      type: String,
      required: true,
    },
  },
  async mounted() {
    if (this.nickname) {
      this.initChatRoom();
    }
  },
  updated() {
    this.scrollToBottom();
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.emit('disconnected');
    }
  },
  computed: {
    ...mapState({
      sender: 'sender',
      loginUser: 'loginUser',
    }),
    moreItems() {
      return [
        { key: 'LEAVE_ROOM', text: 'Leave this room' },
        { key: 'PRESENTATION_ON', text: 'Presentation Mode' },
      ];
    },
    nickname() {
      return this.sender.nickname;
    },
    messageType() {
      if (this.itsMessageType === 'positive') {
        return 'GOOD';
      }
      if (this.itsMessageType === 'negative') {
        return 'BAD';
      }
      if (this.itsMessageType === 'question') {
        return 'QUESTION';
      }
      return '';
    },
    isOwner() {
      if (!this.loginUser) {
        return false;
      }
      return this.loginUser.email === this.owner;
    },
  },
  methods: {
    async initChatRoom() {
      const roomInfo = await fetchRoomByLink(this.roomId);
      if (roomInfo) {
        this.owner = roomInfo.owner;
        this.title = roomInfo.title;

        this.fetchOldMessages();
        this.onSocket();
      }
    },
    onChangeNickname(nickname) {
      this.$store.dispatch('saveSender', { roomId: this.roomId, nickname });

      this.initChatRoom();
    },
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
        status: this.messageType,
        msg: this.message,
        sender: this.nickname,
        roomId: this.roomId,
      }, (data) => {
        console.log(data);
        this.message = null;
      });
    },
    scrollToBottom() {
      const list = this.$el.querySelector('.message-list-wrapper');
      if (list) {
        list.scrollTo({
          top: list.scrollHeight,
        });
      }
    },
    onClickMoreItem(type) {
      switch (type) {
        case 'LEAVE_ROOM':
          this.$store.dispatch('clearSender');
          this.$router.push('/');
          break;
        case 'PRESENTATION_ON':
          this.isPresentationMode = !this.isPresentationMode;
          break;
        default:
          break;
      }
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
  position: relative;
  background-color: $main-color-dark;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .connection-bar-title {
    flex: 1;
    font-size: .88em;
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding-right: 2em;
  }

  .more-button-wrapper {
    width: 25px;
    height: 100%;
    padding-right: 5px;
    position: absolute;
    top: 0;
    right: 0;
  }
}

.message-list-wrapper {
  flex: 1;
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
    .message-input {
      max-height: 5em;
      background: #fff;
      margin: 0.1em 0 .5em;
      border-radius: 1.5em;
      width: calc(100vw - 20px);
      padding: .6em;
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
  margin: .3em;
  img {
    height: 1em;
    margin: .3em;
    width: 1.25em;
  }
}

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

#name-nickname {
  color: orange;
  position: absolute;
}

.owner-wrapper {
  display: none;
  &.show-owner {
    display: block;
  }
}
</style>
