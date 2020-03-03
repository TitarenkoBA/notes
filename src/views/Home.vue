<template>
  <div class="home">
    <h1 class="home__title">This is an home page</h1>
    <button class="home__button" @click="createNewNote()">Create</button>
    <Note v-for="note of notes" :key="note.id" :id="note.id" :note="note" :isNotesPreview="true"/>
  </div>
</template>

<script>
import Note from '@/components/Note.vue';

export default {
  name: 'Home',
  components: {
    Note,
  },
  methods: {
    createNewNote() {
      this.$store.dispatch('createNewNote')
        .then(() => this.$router.push('/editing'));
    },
  },
  computed: {
    notes() {
      return this.$store.state.notes;
    },
  },
};
</script>

<style lang="less" scoped>
.home__button {
  margin: 10px auto 0 -50%;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  width: 10%;
  padding: 5px;
  color: white;
  background-color: #0099ff;
  text-decoration: none;
  transition: all 0.5s;
  &:hover {
    background-color: #0066ff;
  }
  &:active {
    background-color: #99ccff;
  }
}
</style>
