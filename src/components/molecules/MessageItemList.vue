<template>
  <div>
      <msg-box :class="['message-item', {'msg-good': msg.status === 'GOOD', 'msg-bad': msg.status === 'BAD'}]"
        v-for="msg in messages"
        :key="msg.id">
        <p>{{msg.msg}}
          <span>{{msg.createDate | date_format}}</span> 
        </p>
        <!-- {{msg.sender}} : {{msg.status}} : {{msg.msg}} > {{msg.createDate | date_format}} -->
      </msg-box>
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
.message-item {
  padding: 1em;
  position: relative;
  width: 100%;
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-start;
  // width: fit-content;
  // margin-bottom: 10px;
}

.msg-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: flex-start;
  // width: fit-content;
  // margin-bottom: 10px;
}
.msg-good,
.msg-bad {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 1.5em 0;
  p {
    border-radius: 2em;
    padding: .5em 0.9em;
    position: absolute;
    top: 0;
    width: fit-content;
    span {
      bottom: 0;
      color: rgba(255,255,255,.4);
      font-size: 0.8em;
      position: absolute;
    }
  }
}

.msg-good {
 p {
    background-color: $color-positive;
    color: #fff;
    max-width: 71%;
    width: fit-content;
    left: 1em;
    span {
      right: -50px;
    }
  }
}

.msg-bad {
  p {
    background-color: $color-negative;
    color: #000;
    text-align: right;
    width: fit-content;
    right: 1em;
    span {
      left: -50px;
    }
  }
}

</style>
