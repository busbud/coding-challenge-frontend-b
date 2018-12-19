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
