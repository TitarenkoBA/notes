<template>
  <div>
    <Note v-for="note of notes" :key="note.id" :note="note" :isNotesPreview="true"/>
  </div>
</template>

<script>
import Note from '@/components/Note.vue';

export default {
  name: 'NotesPreview',
  components: {
    Note,
  },
  computed: {
    notes() {
      return this.$store.state.notes;
    },
  },
};
</script>
