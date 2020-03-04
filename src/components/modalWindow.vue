<template>
  <div class="modal">
    <div class="modal__window">
      <p
        v-if="this.isCancelOrDelete"
        class="modal__text">
        Exit without saving changes?
      </p>
      <p
        v-else
        class="modal__text">
        Delete this note?
      </p>
      <button class="modal__button" @click="modalConfirm()">Done</button>
      <button class="modal__button" @click="modalDiscard()">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modalWindow',
  methods: {
    modalConfirm() {
      if (this.isCancelOrDelete) {
        this.$store.dispatch('modalConfirmCancel')
          .then(() => this.$store.dispatch('updateNotes'))
          .then(() => this.$router.push('/'));
      } else {
        this.$store.dispatch('modalConfirmDelete')
          .then(() => this.$store.dispatch('updateNotes'))
          .then(() => this.$router.push('/'));
      }
    },
    modalDiscard() {
      this.$store.dispatch('modalDiscard');
    },
  },
  computed: {
    isCancelOrDelete() {
      return this.$store.state.ModalWindowTypeIsCancel;
    },
  },
};
</script>

<style lang="less" scoped>
.modal {
  position: fixed;
  z-index: 1001;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal__window {
  margin: 15% auto;
  width: 35%;
  height: 25%;
  border: 5px solid #0099ff;
  background-color: white;
  border-radius: 10px;
}
.modal__text {
  margin-top: 7%;
}
.modal__button {
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  width: 30%;
  padding: 5px;
  margin: 5% 5%;
  color: white;
  background-color: #0099ff;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  &:hover {
    background-color: #0066ff;
    box-shadow: none;
  }
  &:active {
    background-color: #99ccff;
    box-shadow: none;
  }
}
</style>
