<template>
  <div
    class="city-banner"
    :style="{backgroundImage: 'url(' + cityImageUrl + ')'}"
  >
    <h1 class="city-banner__title">
      <span
        class="city-banner__prefix"
        v-if="prefix"
      >{{ prefix }}:</span>
      {{ cityName }}
    </h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class CityBanners extends Vue {
  @Prop() cityName: string;
  @Prop() cityImageUrl: string;
  @Prop() prefix: string;
}
</script>

<style lang="scss" scoped>
.city-banner {
  background-size: cover;
  padding: 32px 0; 
  width: 100%;
  height: 150px;
  background-position: 50%;
  z-index: -1;

  @media screen and (min-width: 500px) {
    height: 225px;
  }
  @media screen and (min-width: 700px) {
    height: 300px;
  }

  &__title {
    padding-left: 32px;
  }

  &__prefix {
    font-weight: lighter;
  }
}
</style>

