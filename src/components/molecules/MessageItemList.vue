<template>
  <div class="msg-box">
    <div :class="['message-item',
    {'msg-good': msg.status === 'GOOD', 'msg-bad': msg.status === 'BAD', 'msg-q': msg.status === 'QUESTION'}]"
         v-for="msg in messages"
         :key="msg.id">
      <p>{{msg.msg}}</p>
      <span>{{msg.createDate | date_format}}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
  },
  filters: {
    date_format(value) {
      return moment(value).format('hh:mm:ss');
    },
  },
};
</script>

<style scoped lang='scss'>
@mixin message {
  max-width: 60%;
  border-radius: 1.5em;
  padding: .7em .9em;
  word-break: break-word;
  text-align: left;
}

.msg-box {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.message-item {
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: flex-start;
  padding: .45em .9em;
  align-items: flex-end;

  &.msg-good {
    flex-direction: row;
    p {
      @include message;
      background-color: $chat-color-positive;
      color: #fff;
    }
  }

  &.msg-bad {
    flex-direction: row-reverse;
    p {
      @include message;
      background-color: $chat-color-negative;
      color: #fff;
    }
  }

  &.msg-q {
    flex-direction: row;
    p {
      display: inline-block;
      position: relative;
      &::before {
        content: 'Question';
        align-items: center;
        bottom: 0;
        display: flex;
        left: 0;
        padding: 1em;
        position: absolute;
        top: 0;
        width: 6em;
      }
      &::after {
        content: '';
        background: #fff;
        bottom: .7em;
        display: block;
        height: 75%;
        left: 6em;
        position: absolute;
        top: .7em;
        width: 1px;
      }
      border: 1px solid #fff;
      border-radius: 5px;
      box-shadow: 0 0 7px rgba(255,255,255,.7);
      color: #fff;
      max-width: 100%;
      padding: .7em .9em .7em 7em;
      word-break: break-word;
      text-align: left;
    }
    span {
      display: none;
    }
  }

  span {
    color: rgba(255,255,255,.4);
    font-size: 0.8em;
  }
}
</style>
