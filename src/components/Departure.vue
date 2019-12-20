<template>
      <v-container>
        <v-card class="departure-card">
          <v-row>
          <v-card-title>
            <v-img
              max-width="100px"
              :src="operatorLogo"
            />
          </v-card-title>
          <v-spacer/>
          <v-card-title>
            <span class="orange--text">{{priceFormatted}}</span>
          </v-card-title>
          </v-row>
          <v-card-text class="departure-text">
            <span class="time-text">{{getFormattedTime(departure.departure_time)}}</span>
            {{getLocationAndCityNameFormatted(departure.origin_location_id)}}
          </v-card-text>
            <br>
          <v-card-text class="departure-text">
            <span class="time-text">{{getFormattedTime(departure.arrival_time)}}</span>
            {{getLocationAndCityNameFormatted(departure.destination_location_id)}}
          </v-card-text>
          <v-card-text class="duration-text">
            <span class="capitilize">{{$t('message.duration')}}</span>  {{durrationFormatted}}
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
      tyoe: Object,
      requires: true,
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
    }),
    timeLocaleFormatString() {
      switch (this.$i18n.locale) {
        case 'en':
          return 'h:mm A';
        case 'fr':
          return 'HH:MM';
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
