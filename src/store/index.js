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
    todoChangeStatus(state, IDs) {
      const changedTodo = this.state.notes
        .find((el) => el.id === IDs.noteID).todos
        .find((el) => el.id === IDs.todoID);
      changedTodo.isComplete = !changedTodo.isComplete;
    },
    editNote(state, note) {
      this.state.EditingNote = { ...note };
    },
    deleteNote(state, noteID) {
      const { notes } = this.state;
      const noteIndex = notes.findIndex((el) => el.id === noteID);
      notes.splice(noteIndex, 1);
    },
  },
  actions: {
    todoChangeStatus(context, IDs) {
      context.commit('todoChangeStatus', IDs);
    },
    editNote(context, note) {
      context.commit('editNote', note);
    },
    deleteNote(context, noteID) {
      context.commit('deleteNote', noteID);
    },
  },
  modules: {
  },
});
