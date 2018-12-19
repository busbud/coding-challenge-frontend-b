<template>
  <div>
    <div class="before"></div>
    <div class="after"></div>
    <pre>{{departures}}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";

@Component
export default class DeparturesList extends Vue {
  @State public departures;
  @Action private fetchDepartures;

  public async created() {
    await this.fetchDepartures();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
pre {
  text-align: left;
}
.before {
  background-image: url("https://busbud.imgix.net/city-hires/1474307214322-NewYork,NewYork,UnitedStates.jpg?h={height}&w={width}&auto=format,compress");
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
}
.after{
   background-image: url("https://busbud.imgix.net/city-heroes/montreal.jpg?h={height}&w={width}&auto=format");
  background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
}
</style>
