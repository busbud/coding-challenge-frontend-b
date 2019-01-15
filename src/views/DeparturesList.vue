<template>
  <div class="departures-list">
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
    <loader v-if="!areAllDeparturesLoaded"></loader>
  </div>
</template>

<script lang="ts">
import CityBanners from "@/components/CityBanners.vue";
import Loader from "@/components/Loader.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";

@Component({
  components: {
    CityBanners,
    Loader,
  },
})
export default class DeparturesList extends Vue {
  @State public departures;
  @State public destinationCity;
  @State public departingCity;
  @State public areAllDeparturesLoaded;
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
.departures-list {
  margin-bottom: 50px;
}

.departures {
  list-style: none;
  margin: 16px;
  padding: 0;

  &__departure {
    padding: 16px 0;
    width: 100%;
    border-bottom: 1px solid #ccc;

    @media screen and (min-width: 400px) {
      display: flex;
    }
  }

  &__info {
    @media screen and (min-width: 400px) {
      flex-grow: 1;
    }
  }

  &__buy {
    @media screen and (min-width: 400px) {
      flex-grow: 1;
      align-self: center;
      text-align: right;
    }
  }

  &__buy-button {
    text-decoration: none;
    color: #fff;
    background-color: #f19020;
    border-color: #f19020;
    padding: 12px 0;
    border-radius: 5px;
    display: block;
    text-align: center;
    margin-top: 16px;
    width: 100%;

    @media screen and (min-width: 400px) {
      padding: 12px 16px;
      display: inline;
      margin-top: 0;
      width: auto;
    }
  }
}
</style>
