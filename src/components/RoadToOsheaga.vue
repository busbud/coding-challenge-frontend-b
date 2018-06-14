<template>
  <div>
    <TravelSearchPanel :refresh="refresh"/>
    <b-table striped hover :items="travels.departures" :fields="fields" :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc" :sort-compare="comparePrices">
    </b-table>
    <img src="../assets/spinner.gif" v-if="search.inProgress"/>
  </div>
</template>

<script>

import TravelSearchPanel from '@/components/TravelSearchPanel'

// const { fakeTravels } = require('./data.js')
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
      ]
    }
  },
  computed: {
    search () {
      return this.$store.state.search
    },
    travels () {
      return this.$store.state.travels
    }
  },
  created: function () {
    this.refresh()
  },
  methods: {
    refresh (event) {
      this.$store.dispatch({
        type: 'search'
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
