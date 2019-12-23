<template>
  <v-container
    fluid>
    <v-row>
      <v-col cols="12">
        <v-img
          :max-height="breakpointMdAndUp ? '500px' : ''"
          gradient="to bottom, rgba(18, 124, 203, .65), rgba(91, 143, 168, .65)"
          src="https://busbud.imgix.net/country-heroes/us.jpg?auto=format,compress&q=10">
          <v-row>
            <v-col cols="1"/>
            <v-col col="10">
              <h1 class="headline-text">{{$t('message.headline')}}</h1>
            </v-col>
            <v-col cols="1"/>
          </v-row>
          <v-row>
            <v-col cols="1"/>
            <v-col col="10">
            <search-card/>
            </v-col>
            <v-col cols="1"/>
          </v-row>
        </v-img>
        <v-container fluid>
          <v-row v-for="dep in departures" :key="dep.id">
            <v-col v-show="breakpointMdAndUp" md="2"/>
            <v-col cols="12" md="8">
                <departure :departure="dep"/>
            </v-col>
            <v-col v-show="breakpointMdAndUp" md="2"/>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Departure from '../components/Departure.vue';
import SearchCard from '../components/SearchCard.vue';

export default {
  name: 'home',
  components: {
    Departure,
    SearchCard,
  },
  computed: {
    ...mapGetters({
      departures: 'departures',
    }),
    breakpointMdAndUp() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
  },
};
</script>
<style scoped>
.headline-text {
  color: white;
  margin-top: 5%;
  padding-left: 12px;
}
</style>
