<template>
  <b-table striped hover :items="travels.departures" :fields="fields"></b-table>
</template>

<script>
const { fakeTravels } = require('./data.js')
export default {
  name: 'RoadToOsheaga',
  data () {
    return {
      fields: {
        departure_time: {
          label: 'departure_time',
          sortable: true
        },
        departure_timezone: {
          label: 'departure_timezone',
          sortable: true
        },
        arrival_time: {
          label: 'arrival_time',
          sortable: true
        },
        arrival_timezone: {
          label: 'arrival_timezone',
          sortable: true
        },

        origin_location_id: {
          label: 'origin_location_id',
          sortable: true
        },

        'prices.total': {
          label: 'Price'
        }
        // departure time, the arrival time, the location name and the price
      },
      pollingJSTaskHandle: undefined,
      travels: {},
      search: {
        pollingIntervalSeconds: 10,
        geoHashOrigin: 'dr5reg',
        geoHashDestination: 'f25dvk',
        date: new Date(2018, 8, 2, 0, 0, 0, 0),
        parameters: {
          adult: 1,
          child: 0,
          senior: 0,
          lang: 'EN',
          currency: 'USD'
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
      return `https://napi.busbud.com/x-departures/${this.search.geoHashOrigin}/${this.search.geoHashDestination}/${this.search.date.toISOString().split('T')[0]}`
    },
    pollUrl: function () {
      return this.serviceUrl + '/poll'
    }
  },
  created: function () {
    this.fetchTravelsFake()

    const component = this
    this.pollingJSTaskHandle = setInterval(function () {
      // if we get data from the initial API call, then poll departures and operators
      if (component.travels && component.travels.departures) {
        component.pollTravels()
      }
    }, this.search.pollingIntervalSeconds * 1000)
    console.log(`polling task handle : ${this.pollingJSTaskHandle}`)
  },
  methods: {
    fetchTravels () {
      this.$http.get(this.serviceUrl,
        {
          headers: this.search.headers,
          params: this.search.parameters
        })
        .then((response) => {
          console.log(response.body)
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
          }

          // append departures
          if (response.body.departures && response.body.departures.length > 0) {
            this.travels.departures = this.travels.departures.concat(response.body.departures)
          }

          // append operators
          if (response.body.operators && response.body.operators.length > 0) {
            this.travels.operators = this.travels.operators.concat(response.body.operators)
          }

          console.log('departures' + JSON.stringify(this.travels.departures))
          console.log('operators' + JSON.stringify(this.travels.operators))
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
