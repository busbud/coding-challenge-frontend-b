<template>
  <header>
    <picture class="logo">
      <img
        alt="Osheaga logo"
        src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png"
        class="logo__image"
      >
    </picture>
    <nav class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/new-york-to-montreal">How to get to Montreal</router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";

@Component
export default class OsheagaHeader extends Vue {}
</script>


<style lang="scss">
.logo {
  display: block;
  margin: 20px auto;
  text-align: center;

  &__image {
    width: 200px;
  
    @media screen and (min-width: 500px) {
      width: 300px;
    }
    @media screen and (min-width: 700px) {
      width: 400px;
    }
  }
}
.nav {
  padding: 30px;
  text-align: center;
  
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #666;
    }
  }
}
</style>
