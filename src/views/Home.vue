<template>
  <div class="home">
    <div class="home__landscape"></div>
    <img
      alt="Osheaga logo"
      src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png"
      class="home__logo"
    >
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
  text-align: center;

  &__landscape {
    background-image: url("https://busbud.imgix.net/city-hires/1474307214311-Montreal,Quebec,Canada.jpg?h=1920&w=1080&auto=format,compress");
    background-position-x: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }

  &__logo {
    width: 200px;
    
    @media screen and (min-width: 500px) {
      width: 300px;
    }
    @media screen and (min-width: 700px) {
      width: 400px;
    }
  }
}
</style>

