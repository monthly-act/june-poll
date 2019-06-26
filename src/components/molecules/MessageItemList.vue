<template>
  <div class="msg-box">
    <div :class="['message-item', {'msg-good': msg.status === 'GOOD', 'msg-bad': msg.status === 'BAD'}]"
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
$color-positive: #38375D;
$color-negative: #B9B9BE;

@mixin message {
  max-width: 60%;
  border-radius: 2em;
  padding: .5em 0.9em;
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
  padding: .8em;
  align-items: flex-end;

  &.msg-good {
    flex-direction: row;
    p {
      @include message;
      background-color: $color-positive;
      color: #fff;
    }
  }

  &.msg-bad {
    flex-direction: row-reverse;
    p {
      @include message;
      background-color: $color-negative;
      color: #000;
    }
  }
  span {
    color: rgba(255,255,255,.4);
    font-size: 0.8em;
  }
}

</style>
