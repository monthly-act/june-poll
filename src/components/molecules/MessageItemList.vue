<template>
  <div class="msg-box">
    <div :class="['message-item',
    {'msg-good': msg.status === 'GOOD', 'msg-bad': msg.status === 'BAD'}]"
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

<style scoped>
@import '../../styles/components/MessageItemList.scss';
</style>
