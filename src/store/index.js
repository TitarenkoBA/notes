import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
      const { notes } = state;
      const noteIndex = notes.findIndex((el) => el.id === noteID);
      notes.splice(noteIndex, 1);
    },
    savePrevChanges(state) {
      state.EditingNote = { ...this.state.LastEditingNote };
    },
    saveLastChanges(state, note) {
      state.LastEditingNote = { ...note };
    },
    cleateNewNote() {
      this.state.LastEditingNote = {
        id: Math.round(Math.random() * 100),
        title: 'New note',
        todos: {},
      };
    },
    saveNote(state) {
      const newNote = state.LastEditingNote;
      const note = state.notes.find((el) => el.id === newNote.id);
      if (note) {
        note.id = newNote.id;
        note.title = newNote.title;
        note.todos = newNote.todos;
      } else {
        state.notes.unshift(newNote);
      }
    },
    cancel(state) {
      state.LastEditingNote = {};
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
    cleateNewNote(context) {
      context.commit('cleateNewNote');
    },
    saveNote(context) {
      context.commit('saveNote');
    },
    cancel(context) {
      context.commit('cancel');
    },
  },
  modules: {
  },
});
