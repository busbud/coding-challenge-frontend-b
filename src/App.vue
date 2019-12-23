<template>
  <v-app>
    <v-content>
      <nav-bar/>
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
import Home from './pages/Home.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    Home,
    NavBar,
  },
};
</script>
