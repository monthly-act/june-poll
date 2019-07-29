<template>
  <div class="more-button-wrapper">
    <div class="more-button-target" @click="onClickExpand"></div>

    <div class="more-button-content" v-show="expanded">
      <div class="more-button-content-item"
           v-for="item in items"
           :key="item.key"
           @click="onClickItem(item.key)"
      >
        <a-label class="item-text" :text="item.text"/>
      </div>
    </div>
  </div>
</template>

<script>
import ALabel from '@/components/atoms/ALabel.vue';

export default {
  name: 'MoreButton',
  components: { ALabel },
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
      this.expanded = false;
      this.$emit('click', key);
    },
  },
};
</script>

<style scoped lang="scss">
  .more-button-wrapper {
    width: 100%;
    height: 100%;

    .more-button-target {
      width: 100%;
      height: 100%;
      background-image: url("../../assets/ic-more-vert.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }

    .more-button-content {
      position: absolute;
      right: 0;
      width: 9.375em;
      transition: height 0.2s;
      background-color: #ffffff;
      z-index: 10;

      &-item {
        width: 100%;
        height: 3em;
        background-color: #000000;
      }

      .item-text {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 1em;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
