<template>
  <div class="speed-dial-wrapper">
    <div class="speed-dial-target">
      <a-button id='speed-dial-add-button' :class="['target-button', {expanded}]"
                @click="onClickExpand"
      />
    </div>

    <div class="speed-dial-content" v-show="expanded">
      <div class="speed-dial-content-item"
           v-for="item in items"
           :key="item.key"
           @click="onClickItem(item.key)"
      >
        <a-label class="item-text" :text="item.text"/>
        <div class="item-button" :class=item.key>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ALabel from '@/components/atoms/ALabel.vue';
import AButton from '@/components/atoms/AButton.vue';

export default {
  name: 'SpeedDial',
  components: { ALabel, AButton },
  data() {
    return {
      expanded: false,
    };
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onClickExpand() {
      this.expanded = !this.expanded;
    },
    onClickItem(key) {
      this.$emit('click', key);
    },
  },
};
</script>

<style scoped lang="scss">
.speed-dial-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;

  .speed-dial-target {
    width: 2.815em;
    height: 2.815em;

    .target-button {
      width: 100%;
      height: 100%;
      border: 1px solid #707070;
      background-color: transparent;
      transition: transform 0.2s;
      &.expanded {
        transform: rotate(45deg);
        background-color: #fff;
      }
    }
  }

  .speed-dial-content {
    width: 100%;
    height: fit-content;
    transition: height 0.2s;

    &-item {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-bottom: 1.125em;
      padding-right: 0.375em;
    }

    .item-text {
      text-align: right;
      padding-right: 0.8125em;
    }
    .item-button {
      background: url('../../assets/ico_settings.png') center no-repeat;
      border-radius: 1em;
      cursor: pointer;
      padding: 1.2em;
      &:hover {
        background-color: #fff;
      }
      &.CREATE_ROOM {
        background: url('../../assets/ico_create_a_room.png') center no-repeat;
      }
      &.SIGN_OUT {
        background: url('../../assets/ico_logout.png') center no-repeat;
      }
    }
  }
  #speed-dial-add-button {
    background-image: url('../../assets/ico-add.png');
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>
