<template>
  <div class="editing">
    <h1 class="editing__title">This is an editing page</h1>
    <Note
      :note="EditingNote"
      :isNotesPreview="false"/>
    <div class="editing__buttons-container">
      <button class="editing__button" @click="saveNote()" title="Save note">
        Save
      </button>
      <button class="editing__button" @click="cancel()" title="Cancel changes">
        Cancel
      </button>
      <button class="editing__button" @click="stepBack()" title="Undo changing">
        <i class="fa fa-undo" aria-hidden="true"></i>
      </button>
      <button class="editing__button" @click="stepForward()" title="Redo changing">
        <i class="fa fa-redo" aria-hidden="true"></i>
      </button>
      <button class="editing__button" @click="deleteNote()" title="Delete note">
        Delete
      </button>
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
        .then(() => this.$store.dispatch('updateNotes'))
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
.editing__title {
  background-color: #0099ff;
  color: white;
  padding: 3%;
  margin: 0 0 3% 0;
  box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.4);
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
}
.editing__buttons-container {
  width: 80%;
  padding-top: 3%;
  margin: auto;
  @media screen and (max-width: 980px) {
    & {
      display: flex;
      flex-direction: column;
      width: 98%;
    }
  }
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
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    background-color: #0066ff;
    box-shadow: none;
  }
  &:active {
    background-color: #99ccff;
    box-shadow: none;
  }
  @media screen and (max-width: 980px) {
    & {
      width: 100%;
    }
  }
}
</style>
