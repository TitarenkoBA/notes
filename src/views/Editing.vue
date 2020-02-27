<template>
  <div class="editing">
    <h1>This is an editing page</h1>
    <button><router-link to="/">Back to main page</router-link></button>
    <Note :note="EditingNote" :isNotesPreview="false"/>
  </div>
</template>

<script>
import Note from '@/components/Note.vue';

export default {
  name: 'Editing',
  components: {
    Note,
  },
  computed: {
    EditingNote() {
      return this.$store.state.EditingNote;
    },
  },
};
</script>
