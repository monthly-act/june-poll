<template>
  <page-with-title-bar title="welcome">
    <h1>User Page</h1>

    <div class="room-list-wrapper">
      <md-list>
        <md-list-item v-for="room in rooms"
                      :key="room._id">
          <span class="md-list-item-text">
            {{room.name}}
          </span>
          <span class="md-list-item-text">
            {{room.create_date}}
          </span>
        </md-list-item>
      </md-list>
    </div>

    <div class="add-button-wrapper">
      <md-button class="md-fab">
        <md-icon>add</md-icon>
      </md-button>
    </div>
  </page-with-title-bar>
</template>

<script>
import PageWithTitleBar from '@/components/templates/PageWithTitleBar.vue';
import { BACKEND_URL } from '@/constants/backend';

export default {
  components: {
    PageWithTitleBar,
  },
  async mounted() {
    const { data } = await fetch(`${BACKEND_URL}/api/rooms`, {
      credentials: 'include',
    }).then(res => res.json());
    console.log(data);
    this.rooms = data;
  },
  data() {
    return {
      rooms: '',
    };
  },
};
</script>

<style scoped lang="scss">
.room-list-wrapper {
  margin-top: 30px;
}
.add-button-wrapper {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
</style>
