<template>
  <div class="home">
    <button><router-link to="/editing">Create new note</router-link></button>
    <NotesPreview />
  </div>
</template>

<script>
import NotesPreview from '@/components/NotesPreview.vue';

export default {
  name: 'Home',
  components: {
    NotesPreview,
  },
};
</script>
