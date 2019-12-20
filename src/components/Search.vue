<template>
  <v-container
    fluid>
    <v-row dense>
      <v-col>
        <v-img
          width="100%"
          max-height="450px"
          gradient="to bottom, rgba(18, 124, 203, .65), rgba(91, 143, 168, .65)"
          src="https://busbud.imgix.net/country-heroes/us.jpg?auto=format,compress&q=10">
          <v-row>
            <v-col cols="12">
              <v-row
                align="center"
                justify="center">
                <v-card
                  class="search-card"
                  width="75%"
                  raised
                  elevation="24">
                    <v-card-actions>
                      <v-col>
                      <v-row>
                        <v-autocomplete
                          default="Montreal"
                          filled
                          outlined
                          :label="$t('message.origin')"
                          v-model="origin"
                          :items="cityOptions"/>
                        <v-autocomplete
                          default="New York"
                          outlined
                          filled
                          :label="$t('message.destination')"
                          v-model="destination"
                          :items="cityOptions"/>
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="outboundDate"
                          transition="scale-transition"
                          offset-y
                          min-width="290px">
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              filled
                              outlined
                              v-model="outboundDate"
                              :label="$t('message.date')"
                              readonly
                              v-on="on"></v-text-field>
                          </template>
                          <v-date-picker v-model="outboundDate" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn
                              text color="primary"
                              @click="menu = false">
                              {{$t('message.cancel')}}
                            </v-btn>
                            <v-btn
                              text color="primary"
                              @click="$refs.menu.save(outboundDate)">
                              {{$t('message.ok')}}
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                        <v-text-field
                          v-model="numberAdults"
                          filled
                          outlined
                          width="60px"
                          :label="$t('message.passengers')"
                          type="number"
                        />
                        <v-btn
                          align="center"
                          color="orange"
                          height="55px"
                          @click="searchTrips">
                          {{$t('message.search')}}
                        </v-btn>
                      </v-row>
                    </v-col>
                    </v-card-actions>
                    <v-row class="sorting-chips">
                      <v-col cols="12">
                          <v-chip-group
                            v-model="sortSelection"
                            mandatory
                            active-class="orange"
                            class="capitilize">
                            <v-chip >
                              {{$t('message.cheapest')}}
                            </v-chip>
                            <v-chip >
                              {{$t('message.fastest')}}
                            </v-chip>
                            <v-chip >
                              {{$t('message.earliest')}}
                            </v-chip>
                            <v-chip >
                              {{$t('message.latest')}}
                            </v-chip>
                          </v-chip-group>
                    </v-col>
                  </v-row>
                </v-card>
              </v-row>
            </v-col>
          </v-row>
        </v-img>
        <v-container fluid>
          <v-row  v-for="dep in departures" :key="dep.id">
            <departure
              :departure="dep"
            />
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
import Departure from './Departure.vue';

export default {
  name: 'search',
  components: {
    Departure,
  },
  data() {
    return {
      cityOptions: [{ text: 'Montreal', value: 'f25dvk' }, { text: 'New York', value: 'dr5reg' }],
      origin: 'dr5reg',
      destination: 'f25dvk',
      outboundDate: moment('2020-08-02').format('YYYY-MM-DD'),
      menu: false,
      sortSelection: 0,
      sortMap: {
        0: this.sortByCheapest,
        1: this.sortByFastest,
        2: this.sortByEarliest,
        3: this.sortByLatest,
      },
      numberAdults: 1,
    };
  },
  async mounted() {
    await this.getTrips({
      origin: this.origin,
      destination: this.destination,
      outboundDate: this.outboundDate,
      numberAdults: this.numberAdults,
    });
  },
  methods: {
    ...mapActions({
      getTrips: 'GET_TRIPS',
      sortByCheapest: 'SORT_BY_CHEAPEST',
      sortByFastest: 'SORT_BY_FASTEST',
      sortByEarliest: 'SORT_BY_EARLIEST',
      sortByLatest: 'SORT_BY_LATEST',
    }),
    async searchTrips() {
      await this.getTrips({
        origin: this.origin,
        destination: this.destination,
        outboundDate: this.outboundDate,
        numberAdults: this.numberAdults,
      });
    },
  },
  computed: {
    ...mapGetters({
      departures: 'departures',
    }),
  },
  watch: {
    sortSelection() {
      this.sortMap[this.sortSelection]();
    },
  },
};
</script>
<style scoped>
.search-card {
  margin-top: 10%;
}

.sorting-chips {
  margin-left: 1px;
}

.capitilize {
  text-transform: capitalize;
}
</style>
