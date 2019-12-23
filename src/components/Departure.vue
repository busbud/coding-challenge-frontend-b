<template>
  <v-container>
    <v-card class="departure-card"
      :loading="loadingDepartures">
      <v-row>
        <v-col cols="6">
        <v-card-title>
          <v-img
            max-width="150px"
            :src="operatorLogo"/>
        </v-card-title>
        </v-col>
        <v-col cols="6" class="d-flex flex-row-reverse">
        <v-card-title>
          <span class="orange--text">{{priceFormatted}}</span>
        </v-card-title>
        </v-col>
      </v-row>
      <v-card-text class="departure-text">
        <span class="capitilize time-text">
          {{$t('message.departure')}}: {{getFormattedTime(departure.departure_time)}} -
        </span>
        {{getLocationAndCityNameFormatted(departure.origin_location_id)}}
      </v-card-text>
        <br>
      <v-card-text class="departure-text">
        <span class="capitilize time-text">
          {{$t('message.arrival')}}: {{getFormattedTime(departure.arrival_time)}} -
        </span>
        {{getLocationAndCityNameFormatted(departure.destination_location_id)}}
      </v-card-text>
      <v-card-text class="duration-text">
        <span class="capitilize time-text">{{$t('message.duration')}}: {{durrationFormatted}}</span>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  name: 'departure',
  props: {
    departure: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getLocationAndCityNameFormatted(locId) {
      const location = this.locations.find(loc => loc.id === locId);
      const city = this.cities.find(cit => cit.id === location.city_id);
      return `${city.name} - ${location.name}`;
    },
    getFormattedTime(date) {
      return moment(date).format(this.timeLocaleFormatString);
    },
  },
  computed: {
    ...mapGetters({
      operators: 'operators',
      locations: 'locations',
      cities: 'cities',
      currency: 'currency',
      loadingDepartures: 'loadingDepartures',
    }),
    timeLocaleFormatString() {
      switch (this.$i18n.locale) {
        case 'en':
          return 'h:mm A';
        case 'fr':
          return 'H:MM';
        default:
          return 'h:mm A';
      }
    },
    operatorLogo() {
      return this.operators.find(op => op.id === this.departure.operator_id).logo_url;
    },
    priceFormatted() {
      const dollars = (this.departure.prices.total / 100).toFixed(2);
      switch (this.$i18n.locale) {
        case 'en':
          return `${this.currency} $${dollars}`;
        case 'fr':
          return `${this.currency} ${dollars}$`;
        default:
          return `${this.currency} $${dollars}`;
      }
    },
    durrationFormatted() {
      return moment.utc(this.departure.duration.asMilliseconds()).format('H[h]m[m]');
    },
  },
};
</script>
<style scoped>
.departure-card {
  padding: 0px 20px 20px 20px;
}
.departure-text {
  padding: 0px 10px 0px 10px;
  margin: 0px 0px 0px 0px;
}

.duration-text {
  padding: 0px 10px 0px 10px;
  margin: 10px 0px 0px 0px;
}

.time-text {
  color: black;
  font-weight: bold;
}

.capitilize {
  text-transform: capitalize;
}

</style>
