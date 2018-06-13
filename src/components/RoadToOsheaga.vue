<template>
  <div>
    <TravelSearchPanel :parameters="search.parameters" :refresh="refresh"/>
    <b-table striped hover :items="travels.departures" :fields="fields" :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc" :sort-compare="comparePrices">
    </b-table>
    <img src="../assets/spinner.gif" id="osheaga-logo" v-if="showSpinner"/>
  </div>
</template>

<script>

import TravelSearchPanel from '@/components/TravelSearchPanel'

const { fakeTravels } = require('./data.js')
const moment = require('moment-timezone')

export default {
  name: 'RoadToOsheaga',
  components: {
    'TravelSearchPanel': TravelSearchPanel
  },
  data () {
    return {
      comparePrices: function (a, b, key) {
        return a.prices.total - b.prices.total
      },
      sortBy: 'price',
      sortDesc: false,
      showSpinner: true,
      fields: [
        /* { // debug purposes
          key: 'departure_time'
        },
        { // debug purposes
          key: 'departure_timezone'
        }, */
        {
          key: 'departure',
          formatter: (value, key, item) => {
            return moment(item.departure_time).format('LLL')
          }
        },
        /* { // debug purposes
          key: 'arrival_time'
        },
        { // debug purposes
          key: 'arrival_timezone'
        }, */
        {
          key: 'arrival',
          formatter: (value, key, item) => {
            return moment(item.arrival_time).format('LLL')
          }
        },
        {
          key: 'origin_location_id',
          label: 'Departure location',
          formatter: (value, key, item) => {
            // get location based on its id
            // eslint-disable-next-line
            const result = this.travels.locations.filter(location => location.id === item.origin_location_id)
            if (result.length > 0) {
              return result[0].name
            } else {
              return 'undefined'
            }
          }
        },
        {
          key: 'price',
          sortable: true,
          formatter: (value, key, item) => {
            return (item.prices.total / 100) + ' ' + this.search.parameters.currency
          }
        }
      ],
      pollingJSTaskHandle: undefined,
      travels: {},
      search: {
        pollingIntervalSeconds: 10,
        geoHashOrigin: 'dr5reg',
        geoHashDestination: 'f25dvk',
        parameters: {
          adult: 1,
          child: 0,
          senior: 0,
          lang: 'EN',
          currency: 'USD',
          date: new Date(2018, 8, 2, 0, 0, 0, 0)
        },
        headers: {
          'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
          'X-Busbud-Token': 'PARTNER_IoysifKUTZqIEyiBCLprjQ'
        }
      }
    }
  },
  computed: {
    serviceUrl: function () {
      return `https://napi.busbud.com/x-departures/${this.search.geoHashOrigin}/${this.search.geoHashDestination}/${this.search.parameters.date.toISOString().split('T')[0]}`
    },
    pollUrl: function () {
      return this.serviceUrl + '/poll'
    }
  },
  created: function () {
    this.refresh()
  },
  methods: {
    refresh (event) {
      this.showSpinner = true
      this.travels = {}

      if (this.pollingJSTaskHandle) {
        clearInterval(this.pollingJSTaskHandle)
      }

      this.fetchTravels()

      const component = this
      this.pollingJSTaskHandle = setInterval(function () {
        // if we get data from the initial API call, then poll departures and operators
        if (component.travels && component.travels.departures) {
          component.pollTravels()
        }
      }, this.search.pollingIntervalSeconds * 1000)
      console.log(`polling task handle : ${this.pollingJSTaskHandle}`)
    },
    fetchTravels () {
      this.$http.get(this.serviceUrl,
        {
          headers: this.search.headers,
          params: this.search.parameters
        })
        .then((response) => {
          this.travels = response.body
        })
    },
    fetchTravelsFake () {
      this.travels = fakeTravels
      console.log('travels', this.travels)
    },
    pollTravels () {
      let searchParametersCopy = Object.assign({}, this.search.parameters)
      searchParametersCopy.index = this.travels.departures.length

      this.$http.get(this.pollUrl,
        {
          headers: this.search.headers,
          params: searchParametersCopy
        })
        .then((response) => {
          console.log(`response complete ? ${response.body.complete}`)
          if (response.body.complete) {
            console.log('clearing interval')
            clearInterval(this.pollingJSTaskHandle)
            this.showSpinner = false
          }

          // append departures
          if (response.body.departures && response.body.departures.length > 0) {
            this.travels.departures = this.travels.departures.concat(response.body.departures)
          }

          // append operators
          if (response.body.operators && response.body.operators.length > 0) {
            this.travels.operators = this.travels.operators.concat(response.body.operators)
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  $primary-color: #f0f;
  .colargol {
    color: $primary-color;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
