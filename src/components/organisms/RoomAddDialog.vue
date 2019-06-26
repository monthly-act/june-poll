<template>
  <md-dialog :md-active.sync="showDialogSync">
    <md-dialog-title>Create new room</md-dialog-title>
    <div class="dialog-content-wrapper">
      <md-field :class="{'md-invalid': errorMessage}">
        <label>Link Url</label>
        <md-input v-model="link" class="md-accent"></md-input>
        <span class="md-error">{{errorMessage}}</span>
      </md-field>

      <md-field :class="{'md-invalid': !title}">
        <label>Title</label>
        <md-input v-model="title" class="md-accent" required></md-input>
        <span class="md-error">required</span>
      </md-field>

      <div class="button-wrapper">
        <md-dialog-actions>
          <md-button @click="onClickCancel">Close</md-button>
          <md-button class="md-accent" @click="onClickSave">Save</md-button>
        </md-dialog-actions>
      </div>
    </div>
  </md-dialog>
</template>

<script>
import { generateUrl } from '@/utils/uuid-util';

export default {
  data() {
    return {
      showDialogSync: this.showDialog,
      title: null,
      link: '',
    };
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.generateRoomUrl();
  },
  watch: {
    showDialogSync(newValue) {
      if (!newValue) {
        this.$emit('cancel');
      }
    },
  },
  computed: {
    userId() {
      return this.$store.state.loginUser.email.split('@')[0];
    },
  },
  methods: {
    onClickCancel() {
      this.$emit('cancel');
    },
    onClickSave() {
      const { link, title } = this;

      this.$emit('save', { link, title });
    },
    generateRoomUrl() {
      this.link = generateUrl(this.userId);
    },
  },
};
</script>

<style scoped>
  .dialog-content-wrapper {
    padding: 0 30px;
  }
  .button-wrapper {
    position: absolute;
    right: 20px;
    bottom: 30px;
  }
  .md-dialog {
    width: 300px;
    height: 500px;
    background: #ffdddd;
  }
</style>
