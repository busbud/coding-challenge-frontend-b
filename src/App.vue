<template>
  <div class="main">
    <osheaga-header></osheaga-header>
    <router-view/>
  </div>
</template>

<script lang="ts">
import OsheagaHeader from "@/components/OsheagaHeader.vue";
import Loader from "@/components/Loader.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";

@Component({
  components: {
    OsheagaHeader,
  },
})
export default class App extends Vue {}
</script>


<style lang="scss">
body {
  margin: 0;
}
.main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
