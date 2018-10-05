<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" id="navbar">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">BusBud</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown :text="currentLang" right>
            <div v-for="lang in langs" :key="lang.value">
              <b-dropdown-item v-on:click="setLanguage(lang.value)">{{lang.text}}</b-dropdown-item>
            </div>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="container">
      <img src="./assets/osheaga.png" id="osheaga-logo"/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment-timezone'
export default {
  name: 'App',
  data () {
    return {
      langs: [
        { value: 'en', text: 'English' },
        { value: 'fr', text: 'Français' }
      ]
    }
  },
  computed: {
    currentLang () {
      return Vue.i18n.locale().toUpperCase()
    }
  },
  methods: {
    setLanguage (lang) {
      Vue.i18n.set(lang)
      moment.locale(Vue.i18n.locale())
      this.$store.commit('setLocale', lang)
    }
  }
}
</script>

<style scoped lang="scss">
  $navbar-color: #f19020;
  $navbar-margin: 25px;

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #navbar {
    background-color: $navbar-color;
  }
  #osheaga-logo {
    margin-top:$navbar-margin;
    margin-bottom:$navbar-margin;
    max-width:100%;
  }
</style>
