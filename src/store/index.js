import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bufferingNote: null,
    LastEditingNote: {},
    EditingNote: {},
    notes: [
      {
        id: 1,
        title: 'first',
        todos: [
          {
            id: 1,
            isComplete: true,
            text: 'first',
          },
          {
            id: 2,
            isComplete: false,
            text: 'second',
          },
          {
            id: 3,
            isComplete: false,
            text: 'third',
          },
        ],
      },
      {
        id: 2,
        title: 'second',
        todos: [
          {
            id: 1,
            isComplete: true,
            text: 'first',
          },
          {
            id: 2,
            isComplete: true,
            text: 'second',
          },
          {
            id: 3,
            isComplete: false,
            text: 'third',
          },
        ],
      },
    ],
  },
  mutations: {
    editNote(state, note) {
      state.LastEditingNote = { ...note };
    },
    deleteNote(state, noteID) {
      const newNotes = [...state.notes];
      const noteIndex = newNotes.findIndex((el) => el.id === noteID);
      newNotes.splice(noteIndex, 1);
      state.notes = [...newNotes];
    },
    savePrevChanges(state) {
      state.EditingNote = { ...this.state.LastEditingNote };
    },
    saveLastChanges(state, note) {
      state.LastEditingNote = { ...note };
    },
    createNewNote() {
      this.state.LastEditingNote = {
        id: Math.round(Math.random() * 100),
        title: 'New note',
        todos: [],
      };
    },
    saveNote(state) {
      const newNote = { ...state.LastEditingNote };
      const newNotes = [...state.notes];
      const note = newNotes.find((el) => el.id === newNote.id);
      if (note) {
        note.id = newNote.id;
        note.title = newNote.title;
        note.todos = newNote.todos;
      } else {
        newNotes.unshift(newNote);
      }
      state.notes = [...newNotes];
    },
    addTodo(state) {
      const newTodo = {
        id: Math.round(Math.random() * 100),
        isComplete: false,
        text: '',
      };
      const newTodos = [...state.LastEditingNote.todos];
      newTodos.push(newTodo);
      state.LastEditingNote.todos = [...newTodos];
    },
    deleteTodo(state, todoIndex) {
      const newTodos = [...state.LastEditingNote.todos];
      newTodos.splice(todoIndex, 1);
      state.LastEditingNote.todos = [...newTodos];
    },
    stepBack(state) {
      state.bufferingNote = { ...state.LastEditingNote };
      state.LastEditingNote = { ...state.EditingNote };
    },
    stepForward(state) {
      state.LastEditingNote = { ...state.bufferingNote };
      state.bufferingNote = { ...state.EditingNote };
    },
  },
  actions: {
    editNote(context, note) {
      context.commit('editNote', note);
    },
    deleteNote(context, noteID) {
      context.commit('deleteNote', noteID);
    },
    savePrevChanges(context) {
      context.commit('savePrevChanges');
    },
    saveLastChanges(context, note) {
      context.commit('saveLastChanges', note);
    },
    createNewNote(context) {
      context.commit('createNewNote');
    },
    saveNote(context) {
      context.commit('saveNote');
    },
    addTodo(context) {
      context.commit('addTodo');
    },
    deleteTodo(context, todoIndex) {
      context.commit('deleteTodo', todoIndex);
    },
    stepBack(context) {
      context.commit('stepBack');
    },
    stepForward(context) {
      context.commit('stepForward');
    },
  },
  modules: {
  },
});
