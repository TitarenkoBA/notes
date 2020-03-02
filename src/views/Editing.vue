<template>
  <div class="editing">
    <h1 class="editing__title">This is an editing page</h1>
    <Note
      :note="EditingNote"
      :isNotesPreview="false"/>
    <div class="editing__buttons-container">
      <button class="editing__button" @click="saveNote()">Save</button>
      <button class="editing__button" @click="cancel()">Cancel</button>
      <button class="editing__button">Step back</button>
      <button class="editing__button">Step forward</button>
      <button class="editing__button" @click="deleteNote()">Delete</button>
    </div>
  </div>
</template>

<script>
import Note from '@/components/Note.vue';

export default {
  name: 'Editing',
  components: {
    Note,
  },
  computed: {
    EditingNote() {
      return this.$store.state.LastEditingNote;
    },
  },
  methods: {
    saveNote() {
      this.$store.dispatch('saveNote')
        .then(() => this.$router.push('/'));
    },
    cancel() {
      this.$store.dispatch('cancel')
        .then(() => this.$router.push('/'));
    },
    deleteNote() {
      const noteID = this.EditingNote.id;
      this.$store.dispatch('deleteNote', noteID)
        .then(() => this.$router.push('/'));
    },
  },
};
</script>

<style lang="less" scoped>
.editing__buttons-container {
  width: 80%;
  padding-top: 5%;
  margin: auto;
}
.editing__button {
  margin-bottom: 5px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  width: 13%;
  padding: 5px;
  margin-right: 5px;
  color: white;
  background-color: #0099ff;
  transition: all 0.5s;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    background-color: #0066ff;
  }
  &:active {
    background-color: #99ccff;
  }
}
</style>
