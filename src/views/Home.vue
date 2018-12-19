<template>
  <div class="home">
    <img alt="Osheaga logo" src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png">
  </div>
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  background-image: url("https://busbud.imgix.net/city-hires/1474307214311-Montreal,Quebec,Canada.jpg?h={height}&w={width}&auto=format,compress");
  background-size: cover;
  background-repeat: no-repeat;
  opacity: .9;
}
</style>

