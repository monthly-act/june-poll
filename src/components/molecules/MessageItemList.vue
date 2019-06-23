<template>
  <div>
    <md-chip :class="['message-item', {'md-accent': msg.status === 'GOOD'}]"
             v-for="msg in messages"
             :key="msg.id">
      {{msg.sender}} : {{msg.status}} : {{msg.msg}} > {{msg.createDate | date_format}}
    </md-chip>
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
.message-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: fit-content;
  margin-bottom: 10px;
}
</style>
