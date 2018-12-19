<template>
  <div>
    <city-banners></city-banners>
    <ul class="departures">
      <li
        class="departures__departure"
        v-for="departure in departures"
        :key="departure.id"
      >
        <div class="departures__info">
          Departing: <b>{{ departure.departure_time | moment("DD MMM YYYY") }}</b> at <b>{{ departure.departure_time | moment("hh:mm") }}</b>
          <br>
          Arriving: <b>{{ departure.arrival_time | moment("DD MMM YYYY") }}</b> at <b>{{ departure.arrival_time | moment("hh:mm") }}</b>
          <br>
          Price: {{ getFractionPrice(departure.prices.total) | currency({ symbol: departure.prices.currency }) }}
        </div>
        <div class="departures__buy">
          <a
            :href="departure.links.deeplink"
            class="departures__buy-button"
          >Buy</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import CityBanners from "@/components/CityBanners.vue"

@Component({
  components: {
    CityBanners
  }
})
export default class DeparturesList extends Vue {
  @State public departures;
  @State public destinationCity;
  @State public departingCity;
  @Action private fetchDepartures;

  public async created() {
    await this.fetchDepartures();
  }

  public getFractionPrice(price) {
    return price / 100;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
pre {
  text-align: left;
}
.departures {
  list-style: none;
  margin: 16px;
  padding: 0;

  &__departure {
    display: flex;
    padding: 16px 0;
    width: 100%;
  }

  &__info {
    flex-grow: 1;
  }

  &__buy {
    flex-grow: 1;
    align-self: center;
    text-align: right;
  }

  &__buy-button {
    text-decoration: none;
    color: #fff;
    background-color: #f19020;
    border-color: #f19020;
    padding: 12px 16px;
    border-radius: 5px;
  }
}
</style>
