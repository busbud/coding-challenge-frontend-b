<template>
  <q-page class="row flex flex-center bg-blue-grey-1">
    <div class="col-7 q-gutter-md"
      style="margin-top: 0rem; margin-bottom: 1rem">
      <!-- loading animation -->
      <q-spinner-bars
        class="fixed-center"
        color="primary"
        size="2em"
        v-if="departures.length == 0"/>
      <!-- departure cards -->
      <q-card
        v-for="departure in departures"
        v-bind:key="departure.id">
        <q-card-section>
          <div class="row text justify-between"
            style="width: 100%; padding-right: 3rem">
            <div class="col-5">
              <img
                v-if="departure.operator_name === 'Greyhound'"
                src="statics/greyhound.jpg"
                style="height: 2rem">
              <img
                v-if="departure.operator_name === 'Adirondack Trailways'"
                src="statics/trailways.png"
                style="height: 1.5rem">
            </div>
            <div class="col-1 text-blue text-h6">
              <strong>{{ formatPrice(departure.price) }}</strong>
            </div>
          </div>
          <div class="row text"
            style="width: 100%">
              <q-icon
                name="trip_origin"
                size="xs"
                style="margin-left: 0.5rem; margin-right: 0.5rem" />
              {{ formatTime(departure.departure_time) }} New York - {{ departure.origin_name }}
          </div>
          <div class="row text text-grey"
            style="width: 100%">
              <q-icon
                name="place"
                size="xs"
                style="margin-left: 0.5rem; margin-right: 0.5rem" />
              {{ formatTime(departure.arrival_time) }} Montreal - {{ departure.destination_name }}
          </div>
          <div class="row text justify-between"
            style="width: 100%; padding-right: 3rem">
            <div class="col-8">
              <q-icon
                name="directions_bus"
                size="xs"
                style="margin-left: 0.5rem"/>
              {{ formatTripDuration(departure.departure_time, departure.arrival_time) }}
            </div>
            <div class="col-1">
              <q-btn
                color="orange"
                label="Select"
                no-caps/>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      date: '2020-08-02',
      operators: {},
      locations: {},
      departures: []
    }
  },
  methods: {
    formatPrice (price) {
      // ex: US$73
      const rounded = String(price).split('')
      rounded.pop()
      rounded.pop()
      return 'US$' + rounded.join('')
    },
    formatTime (date) {
      // ex: 09:32 am
      var period = ' am'
      var time = String(date).split('')
      time = time.slice(11, 16)

      // convert from 24h time
      var hour = time.join('').split(':')[0]
      if (hour > 12) {
        period = ' pm'
        time[0] = time[0] - 1
        time[1] = time[1] - 2
        if (time[1] < 0) {
          time[1] += 10
          time[0] = 0
        }
      }
      return time.join('') + period
    },
    formatTripDuration (departDate, arrivalDate) {
      // ex: 12h 30m
      var departTime = String(departDate).split('')
      departTime = departTime.slice(11, 16)
      var arrivalTime = String(arrivalDate).split('')
      arrivalTime = arrivalTime.slice(11, 16)

      var hours = arrivalTime.join('').split(':')[0] - departTime.join('').split(':')[0]
      if (hours < 0) {
        hours += 24
      }
      var minutes = arrivalTime.join('').split(':')[1] - departTime.join('').split(':')[1]
      if (minutes < 0) {
        minutes += 60
      }
      return hours + 'h ' + minutes + 'm'
    },
    poll () {
      if (!this.complete) {
        this.$axios.get('/x-departures/dr5reg/f25dvk/' + this.date + '/poll?index=' + this.departures.length)
          .then(response => {
            // we need at least departure time, arrival time, location name and price (prices.total)
            // also operator, location names

            // add new operators
            this.operators = response.data.operators

            // then get new departure information
            const newDepartures = this.departures
            for (const departure of response.data.departures) {
              newDepartures.push({
                id: departure.id,
                operator_name: this.operators.find(operator => operator.id === departure.operator_id).display_name,
                departure_time: departure.departure_time,
                arrival_time: departure.arrival_time,
                origin_name: this.locations.find(location => location.id === departure.origin_location_id).name,
                destination_name: this.locations.find(location => location.id === departure.destination_location_id).name,
                price: departure.prices.total
              })
            }
            this.departures = newDepartures
            this.complete = response.data.complete
          })
          .catch((error) => {
            console.error(error)
          })
      }
    }
  },
  mounted () {
    // fetch
    this.$axios.get('/x-departures/dr5reg/f25dvk/' + this.date)
      .then(response => {
        // we need at least departure time, arrival time, location name and price (prices.total)
        // also operator, location names

        // first make operator and location lookup objects for id lookup
        this.operators = response.data.operators
        this.locations = response.data.locations

        // then get departure information
        const newDepartures = []
        for (const departure of response.data.departures) {
          newDepartures.push({
            id: departure.id,
            operator_name: this.operators.find(operator => operator.id === departure.operator_id).display_name,
            departure_time: departure.departure_time,
            arrival_time: departure.arrival_time,
            origin_name: this.locations.find(location => location.id === departure.origin_location_id).name,
            destination_name: this.locations.find(location => location.id === departure.destination_location_id).name,
            price: departure.prices.total
          })
        }
        this.departures = newDepartures

        // then poll if not complete
        this.complete = response.data.complete
        if (!this.complete) {
          setInterval(function () {
            this.poll()
          }.bind(this), 2000)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>

<style lang="sass" scoped>
.text
  margin-bottom: 0.3rem
</style>
