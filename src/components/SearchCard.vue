<template>
  <v-container
    fluid>
    <v-card
      :class="[breakpointMdAndUp ? 'search-card' : '']"
      raised
      elevation="24">
        <v-card-actions>
          <v-row dense>
            <v-col cols="12" md="3">
              <v-autocomplete
                default="Montreal"
                filled
                outlined
                :label="$t('message.origin')"
                v-model="origin"
                :items="cityOptions"/>
            </v-col>
            <v-col cols="12" md="3">
              <v-autocomplete
                default="New York"
                outlined
                filled
                :label="$t('message.destination')"
                v-model="destination"
                :items="cityOptions"/>
            </v-col>
            <v-col cols="12" md="2">
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
                    v-on="on"/>
                </template>
                <v-date-picker
                  v-model="outboundDate"
                  no-title>
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
            </v-col>
            <v-col cols="6" md="2">
              <v-text-field
                v-model="numberAdults"
                outlined
                filled
                type="number"
                :label="$t('message.passengers')"/>
            </v-col>
            <v-col cols="6" sm="2">
              <v-btn
                color="orange"
                height="55px"
                @click="searchTrips">
                {{$t('message.search')}}
              </v-btn>
            </v-col>
          </v-row>
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
  </v-container>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'search-card',
  data() {
    return {
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
      this.sortSelection = 0;
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
      cityOptions: 'cityOptions',
    }),
    breakpointMdAndUp() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
  },
  watch: {
    sortSelection() {
      this.sortMap[this.sortSelection]();
    },
  },
};
</script>
<style>
.search-card {
  margin-top: 5%;
}

.headline-text {
  color: white;
  margin-top: 5%;
}

.sorting-chips {
  margin-left: 1px;
}

.capitilize {
  text-transform: capitalize;
}

input {
  margin-top: 0px !important;
}
</style>
