<template>
  <div class="note" @focusout="saveNote()">
    <h3 class="note__title"
      :class="{contentEditableTitle: !isNotesPreview}"
      :contenteditable="!isNotesPreview">
      {{note.title}}
    </h3>
    <div class="note__todos">
      <div v-for="todo of note.todos" :key="todo.id" class="note__todo">
        <input
          class="note__checkbox"
          v-if="!isNotesPreview"
          type="checkbox"
          :checked="todo.isComplete"
          @change="todoChangeStatus(note.id, todo.id)">
        <p class="note__text"
          :class="{contentEditableText: !isNotesPreview}"
          :contenteditable="!isNotesPreview">
          {{todo.text}}
        </p>
      </div>
    </div>
    <div class="note__buttons-container" v-if="isNotesPreview">
      <button
        class="note__button note__button-edit"
        @click="editNote(note)">
        Edit
      </button>
      <button
        class="note__button note__button-delete"
        @click="deleteNote(note)">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Note',
  props: ['note', 'isNotesPreview'],
  methods: {
    todoChangeStatus(noteID, todoID) {
      const IDs = { noteID, todoID };
      this.$store.dispatch('todoChangeStatus', IDs);
    },
    editNote(note) {
      this.$store.dispatch('editNote', note).then(() => this.$router.push('/editing'));
    },
    deleteNote(note) {
      const noteID = note.id;
      this.$store.dispatch('deleteNote', noteID);
    },
    saveNote() {
    },
  },
};
</script>

<style lang="less" scoped>
.note {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1% auto;
  width: 60%;
  height: 20%;
  border: 5px solid #0099ff;
  border-radius: 10px;
}
.note__title {
  text-align: left;
  width: 100%;
  margin: 0;
  color: white;
  border: 2px solid #0099ff;
  background-color: #0099ff;
  padding: 10px 10px 10px 5%;
  transition: all 0.5s;
}
.contentEditableTitle {
  &:hover {
    cursor: pointer;
    background-color: white;
    color: #0099ff;
  }
  &:focus {
    background-color: white;
    color: #0099ff;
  }
}
.note__todos {
  width: 75%;
  text-align: left;
  padding-left: 5%;
}
.note__todo {
  display: flex;
  margin: 0;
}
.note__checkbox {
  margin-right: 5%;
}
.note__text {
  width: 80%;
  padding: 2%;
  transition: all 0.5s;
}
.contentEditableText {
  &:hover {
    background-color: #99ccff;
    cursor: pointer;
  }
  &:focus {
    background-color: #99ccff;
  }
}
.note__buttons-container {
  width: 20%;
  padding-top: 5%;
}
.note__button {
  margin-bottom: 5px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  width: 90%;
  padding: 5px;
  color: white;
  background-color: #0099ff;
  transition: all 0.5s;
  &:hover {
    background-color: #0066ff;
  }
  &:active {
    background-color: #99ccff;
  }
}
</style>
