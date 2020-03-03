import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    LastEditingNote: {},
    NoteChanges: [],
    ChangesCounter: 0,
    ModalWindowIsShow: false,
    ModalWindowTypeIsCancel: null,
    DeletingNoteID: null,
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
      state.ChangesCounter = 0;
      state.NoteChanges = [];
      state.LastEditingNote = { ...note };
    },
    deleteNote(state, noteID) {
      state.ModalWindowTypeIsCancel = false;
      state.ModalWindowIsShow = true;
      state.DeletingNoteID = noteID;
      // const newNotes = [...state.notes];
      // const noteIndex = newNotes.findIndex((el) => el.id === noteID);
      // newNotes.splice(noteIndex, 1);
      // state.notes = [...newNotes];
      // state.ChangesCounter = 0;
      // state.NoteChanges = [];
    },
    saveLastChanges(state, note) {
      state.NoteChanges.unshift(note);
      if (state.NoteChanges.length >= 100) {
        state.NoteChanges.splice(50, 50);
      }
    },
    createNewNote(state) {
      state.ChangesCounter = 0;
      state.NoteChanges = [];
      state.LastEditingNote = {
        id: Math.round(Math.random() * 100),
        title: 'New note',
        todos: [],
      };
    },
    saveNote(state) {
      const newNote = { ...state.NoteChanges[0] };
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
      state.ChangesCounter = 0;
      state.NoteChanges = [];
    },
    cancel(state) {
      state.ModalWindowTypeIsCancel = true;
      state.ModalWindowIsShow = true;
      // state.ChangesCounter = 0;
      // state.NoteChanges = [];
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
      if (state.ChangesCounter < state.NoteChanges.length) {
        // eslint-disable-next-line no-plusplus
        state.ChangesCounter++;
      }
      state.LastEditingNote = { ...state.NoteChanges[state.ChangesCounter] };
    },
    stepForward(state) {
      if (state.ChangesCounter >= 0) {
        // eslint-disable-next-line no-plusplus
        state.ChangesCounter--;
      }
      state.LastEditingNote = { ...state.NoteChanges[state.ChangesCounter] };
    },
    modalConfirmCancel(state) {
      state.ChangesCounter = 0;
      state.NoteChanges = [];
      state.ModalWindowIsShow = false;
      state.ModalWindowTypeIsCancel = 0;
    },
    modalConfirmDelete(state) {
      const noteID = state.DeletingNoteID;
      const newNotes = [...state.notes];
      const noteIndex = newNotes.findIndex((el) => el.id === noteID);
      newNotes.splice(noteIndex, 1);
      state.notes = [...newNotes];
      state.ChangesCounter = 0;
      state.NoteChanges = [];
      state.ModalWindowIsShow = false;
      state.ModalWindowTypeIsCancel = 0;
    },
    modalDiscard(state) {
      state.ModalWindowIsShow = false;
      state.ModalWindowTypeIsCancel = 0;
    },
  },
  actions: {
    editNote(context, note) {
      context.commit('editNote', note);
    },
    deleteNote(context, noteID) {
      context.commit('deleteNote', noteID);
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
    cancel(context) {
      context.commit('cancel');
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
    modalConfirmCancel(context) {
      context.commit('modalConfirmCancel');
    },
    modalConfirmDelete(context) {
      context.commit('modalConfirmDelete');
    },
    modalDiscard(context) {
      context.commit('modalDiscard');
    },
  },
  modules: {
  },
});
