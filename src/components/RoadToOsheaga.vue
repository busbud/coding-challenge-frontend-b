<template>
  <div>
    <TravelSearchPanel :refresh="refresh"/>
    <b-table striped hover :items="travels.departures" :fields="fields" :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc" :sort-compare="comparePrices">
    </b-table>
    <b-alert show variant="danger" v-if="search.error">{{$t('travels.load_error')}}</b-alert>
    <img src="../assets/spinner.gif" v-if="search.inProgress"/>
  </div>
</template>

<script>
import Vue from 'vue'
import TravelSearchPanel from '@/components/TravelSearchPanel'
const moment = require('moment-timezone')

export default {
  name: 'RoadToOsheaga',
  components: {
    'TravelSearchPanel': TravelSearchPanel
  },
  data () {
    return {
      // table configuration
      comparePrices: function (a, b, key) {
        return a.prices.total - b.prices.total
      },
      sortBy: 'price',
      sortDesc: false
    }
  },
  computed: {
    search () {
      return this.$store.state.search
    },
    travels () {
      return this.$store.state.travels
    },
    fields () {
      return [
        {
          key: 'departure',
          label: Vue.i18n.translate('travels.columns.departure.label'),
          formatter: (value, key, item) => {
            return moment(item.departure_time).format('LLL')
          }
        },
        {
          key: 'arrival',
          label: Vue.i18n.translate('travels.columns.arrival.label'),
          formatter: (value, key, item) => {
            return moment(item.arrival_time).format('LLL')
          }
        },
        {
          key: 'origin_location_id',
          label: Vue.i18n.translate('travels.columns.departure_location.label'),
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
          label: Vue.i18n.translate('travels.columns.price.label'),
          sortable: true,
          formatter: (value, key, item) => {
            return (item.prices.total / 100) + ' ' + this.search.parameters.currency
          }
        }
      ]
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

<style scoped lang="scss">
</style>
