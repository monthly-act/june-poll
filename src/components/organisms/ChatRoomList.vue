<template>
  <div>
    <ul>
      <li v-for="room in rooms" :key="room._id">
        <div v-if="room.open">timer> timer</div>
        <div v-else>timer_off></div>

        <div class="md-list-item-text">
          <span class="md-title">{{room.title}}</span>
          <span class="md-caption">{{room.create_date | dateFormat}}</span>
        </div>

        <button class="md-icon-button"
        @click="doCopyLink(room.link)">link</button>
        
      </li>
    </ul>
    <div>
      <span>{{copiedLink}}</span>
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
