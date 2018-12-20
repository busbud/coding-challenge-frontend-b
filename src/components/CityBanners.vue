<template>
  <div>
    <div
      class="city-banner"
      :style="{backgroundImage: 'url(' + departingCity.image_url + ')'}"
    >
      <h1 class="city-banner__title"><span class="city-banner__prefix">From:</span> {{ departingCity.full_name }}</h1>
    </div>
    <div
      class="city-banner"
      :style="{backgroundImage: 'url(' + destinationCity.image_url + ')'}"
    >
      <h1 class="city-banner__title"><span class="city-banner__prefix">To:</span> {{ destinationCity.full_name }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";

@Component
export default class CityBanners extends Vue {
  @State public destinationCity;
  @State public departingCity;
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

