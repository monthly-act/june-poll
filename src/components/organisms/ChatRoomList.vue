<template>
  <div>
  <md-list class="md-double-line">
    <md-list-item v-for="room in rooms" :key="room._id">
      <md-icon v-if="room.open">timer</md-icon>
      <md-icon v-else>timer_off</md-icon>

      <div class="md-list-item-text">
        <span class="md-title">{{room.title}}</span>
        <span class="md-caption">{{room.create_date | dateFormat}}</span>
      </div>
      <md-button
        class="md-icon-button"
        @click="doCopyLink(room.link)">
        <md-icon>link</md-icon>
      </md-button>
    </md-list-item>

  </md-list>
  <md-snackbar
    md-position="center"
    :md-duration="3000"
    :md-active.sync="showSnackbar"
    md-persistent>
    <span>{{copiedLink}}</span>
  </md-snackbar>
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
  data() {
    return {
      showSnackbar: false,
      copiedLink: null,
    };
  },
  methods: {
    doCopyLink(link) {
      const linkUrl = `${window.location.origin}/room/${link}`;
      this.$copyText(linkUrl)
        .then(({ text }) => {
          this.showSnackbar = true;
          this.copiedLink = text;
        });
    },
  },
};
</script>

<style scoped>

</style>
