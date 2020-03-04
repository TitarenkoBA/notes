<template>
  <div id="app">
    <modalWindow v-if="this.$store.state.ModalWindowIsShow"/>
    <i class="fa fa-book logo" aria-hidden="true" @click="greeting()"></i>
    <router-view/>
  </div>
</template>

<script>
import modalWindow from '@/components/modalWindow.vue';

export default {
  components: {
    modalWindow,
  },
  methods: {
    greeting() {
      // eslint-disable-next-line
      alert('Greeting you! \nCongratulating - you are awesome!!!');
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.logo {
  cursor: pointer;
  position: absolute;
  left: 3%;
  top: 5%;
  font-size: 3em;
  color: white;
}
* {
  font-size: 1em;
}
</style>
