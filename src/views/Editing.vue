<template>
  <div class="editing">
    <h1 class="editing__title">This is an editing page</h1>
    <Note
      :note="EditingNote"
      :isNotesPreview="false"/>
    <div class="editing__buttons-container">
      <button class="editing__button" @click="saveNote()">Save</button>
      <button class="editing__button" @click="cancel()">Cancel</button>
      <button class="editing__button" @click="stepBack()">Step back</button>
      <button class="editing__button" @click="stepForward()">Step forward</button>
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
  methods: {
    saveNote() {
      this.$store.dispatch('saveNote')
        .then(() => this.$router.push('/'));
    },
    cancel() {
      this.$store.dispatch('cancel');
    },
    deleteNote() {
      const noteID = this.EditingNote.id;
      this.$store.dispatch('deleteNote', noteID);
    },
    stepBack() {
      this.$store.dispatch('stepBack');
    },
    stepForward() {
      this.$store.dispatch('stepForward');
    },
  },
  computed: {
    EditingNote() {
      return this.$store.state.LastEditingNote;
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
