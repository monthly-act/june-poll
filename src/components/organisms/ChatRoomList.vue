<template>
  <div class="room-list-wrapper">
    <div
      class="room-list-item"
      v-for="room in rooms"
      :key="room._id">
      <div class="room-info">
        <span class="room-title">
          {{room.title}}
        </span>
        <span class="room-create-date">
          {{room.create_date | dateFormat}}
        </span>
      </div>
      <div class="open-button"
            @click="onClickOpenRoom(room.link)"></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    rooms: {
      type: Array,
      default: () => [],
    },
  },
  filters: {
    dateFormat(value) {
      return moment(value).format('YYYY-MM-DD hh:mm:ss');
    },
  },
  methods: {
    onClickOpenRoom(link) {
      this.$router.push(`/room/${link}`);
    },
  },
};
</script>

<style scoped lang="scss">
.room-list-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.room-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.375em 1.6875em;
  border-bottom: 1px solid #000000;

  .room-info {
    display: flex;
    flex-direction: column;
    .room-title {
      color: #ffffff;
      font-size: 1em;
      padding-bottom: 0.4375em;
    }
    .room-create-date {
      color: #838383;
      font-size: 0.8125em;
    }
  }

  .open-button {
    width: 1.25em;
    height: 1.25em;
    background-image: url("../../assets/ic-open.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
  }
}
</style>
