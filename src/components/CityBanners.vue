<template>
  <div>
    <city-banner
      :city-name="departingCity.full_name"
      :city-image-url="departingCity.image_url"
      prefix="From"
    ></city-banner>
    <city-banner
      :city-name="destinationCity.full_name"
      :city-image-url="destinationCity.image_url"
      prefix="To"
    ></city-banner>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";

import CityBanner from "@/components/CityBanner.vue";

@Component({
  components: {
    CityBanner,
  },
})
export default class CityBanners extends Vue {
  @State public destinationCity;
  @State public departingCity;
}
</script>
