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
      this.state.EditingNote = { ...note };
    },
    deleteNote(state, noteID) {
      const { notes } = this.state;
      const noteIndex = notes.findIndex((el) => el.id === noteID);
      notes.splice(noteIndex, 1);
    },
    saveNote(state, note) {
      this.state.EditingNote = { ...note };
    },
  },
  actions: {
    editNote(context, note) {
      context.commit('editNote', note);
    },
    deleteNote(context, noteID) {
      context.commit('deleteNote', noteID);
    },
    saveNote(context, note) {
      context.commit('saveNote', note);
    },
  },
  modules: {
  },
});
