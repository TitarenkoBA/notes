<template>
  <div class="note" @focusout="saveChanges()">
    <h3 class="note__title"
      @keyup="saveChanges()"
      :class="{note__title_contentEditableTitle: !isNotesPreview}"
      :contenteditable="!isNotesPreview">
      {{note.title}}
    </h3>
    <div class="note__todos">
      <div v-for="todo of note.todos" :key="todo.id" :id="todo.id" class="note__todo">
        <label
          class="note_label"
          :class="{checked: todo.isComplete}"
          @keyup="saveChanges()" >
          <input
            v-if="!isNotesPreview"
            class="note__checkbox"
            type="checkbox"
            :checked="todo.isComplete"
            @change="checkTodo($event)">
        </label>
        <p class="note__text"
          @keyup="saveChanges()"
          :class="{note__text_contentEditableText: !isNotesPreview}"
          :contenteditable="!isNotesPreview">
          {{todo.text}}
        </p>
        <button
          class="note__todo-button"
          v-if="!isNotesPreview"
          @click="deleteTodo($event)">del</button>
      </div>
    </div>
    <div class="note__buttons-container">
      <button
        v-if="isNotesPreview"
        class="note__button"
        @click="editNote(note)">
        Edit
      </button>
      <button
        v-if="isNotesPreview"
        class="note__button"
        @click="deleteNote(note)">
        Delete
      </button>
      <button
        v-if="!isNotesPreview"
        class="note__button"
        @click="addTodo()">
        Add
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Note',
  props: ['note', 'isNotesPreview'],
  methods: {
    editNote(note) {
      this.$store.dispatch('editNote', note).then(() => this.$router.push('/editing'));
    },
    deleteNote(note) {
      const noteID = note.id;
      this.$store.dispatch('deleteNote', noteID);
    },
    saveChanges() {
      const todos = document.querySelectorAll('.note__todo');
      const newTodos = [];
      todos.forEach((item) => {
        newTodos.push(
          {
            id: item.childNodes[1].getAttribute('id'),
            isComplete: item.childNodes[0].checked,
            text: item.childNodes[1].textContent,
          },
        );
      });
      const note = {
        id: this.note.id,
        title: document.querySelector('.note__title').textContent,
        todos: newTodos,
      };
      this.$store.dispatch('saveLastChanges', note);
    },
    addTodo() {
      this.$store.dispatch('addTodo');
      this.saveChanges();
    },
    deleteTodo(event) {
      const todoIndex = [...document.querySelectorAll('.note__todo')]
        .indexOf(event.target.parentNode);
      this.$store.dispatch('deleteTodo', todoIndex)
        .then(() => this.saveChanges());
    },
    checkTodo(event) {
      const todoIndex = [...document.querySelectorAll('.note__todo')]
        .indexOf(event.target.parentNode.parentNode);
      this.$store.dispatch('checkTodo', todoIndex);
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
  box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.4)
}
.note__title {
  text-align: left;
  width: 100%;
  margin: 0;
  color: white;
  border-bottom: 5px solid #0099ff;
  background-color: #0099ff;
  padding: 10px 10px 10px 5%;
  transition: all 0.5s;
}
.note__title_contentEditableTitle {
  &:hover {
    cursor: pointer;
    background-color: white;
    color: #0099ff;
    border-radius: 10px;
  }
  &:focus {
    background-color: white;
    color: #0099ff;
    border-radius: 10px;
  }
}
.note__todos {
  width: 75%;
  text-align: left;
  padding-left: 5%;
}
.note__todo {
  display: flex;
  border-bottom: 1px solid #0099ff;
  &:last-child {
    border-bottom: none;
  }
}
.note__checkbox {
  display: none;
}
.note_label {
  cursor: pointer;
  margin-right: 5%;
  margin-top: 5px;
  width: 30px;
  height: 30px;
  border: 2px solid #0099ff;
  border-radius: 10px;
}
.checked {
  &:before {
    content: "\2713";
    text-shadow: 1px 1px 1px rgba(0, 0, 0, .2);
    font-size: 40px;
    margin-left: 3px;
    color: #0099ff;
    text-align: center;
    line-height: 15px;
  }
}
.note__text {
  width: 80%;
  padding: 2%;
  margin: 0;
  border-radius: 10px;
  border: 2px solid transparent;
  transition: all 0.5s;
}
.note__text_contentEditableText {
  &:hover {
    background-color: #99ccff;
    border: 2px solid transparent;
    cursor: pointer;
  }
  &:focus {
    border: 2px solid #99ccff;
  }
}
.note__todo-button {
  .note__button;
  width: 7%;
  margin-top: 1%;
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
