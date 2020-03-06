<template>
  <q-page class="flex justify-center">
    <div class="row header">
      <div class="col-12">
        <!-- header image banner -->
        <q-img class="header"
          src="statics/bluemountains.png">
          <div class="row justify-between absolute-top bg-transparent"
            style="margin-left: 1rem; margin-top: 0.5rem">
            <div class="text-h5" >
              <img
                src="statics/friendlycrew.png"
                style="height: 1.5rem"> busbud
            </div>
            <div class="col-2.5">
              <!-- language select -->
              <q-btn
                flat
                no-caps
                color="white"
                label="English (Canada)"
                icon-right="keyboard_arrow_down">
                <q-menu>
                  <q-list
                    style="min-width: 100px">
                    <q-item
                      clickable
                      v-close-popup>
                      <q-item-section>English (Canada)</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup>
                      <q-item-section
                        @click="frenchSite()">Français (Canada)</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
          <div class="row absolute-center justify-center bg-transparent"
            style="width: 95%">
            <div class="q-gutter-sm">
              <!-- ticket search -->
              <div class="text-h4">
                <strong>Find cheap bus tickets for </strong>
                <img
                  src="statics/osheaga.png"
                  style="height: 6rem; padding-top: 2rem">
              </div>
              <div>
                Montreal, Canada - July 31 - August 2
              </div>
              <div class="row"
                style="height: 3rem; margin-top: 1.5rem">
                <!-- origin -->
                <q-select
                  hide-dropdown-icon
                  bg-color="white"
                  v-model="origin"
                  :options="originOptions"
                  style="width: 12rem">
                  <template v-slot:prepend>
                    <q-icon
                      name="trip_origin"
                      size="xs"
                      style="margin-left: 0.5rem"/>
                  </template>
                </q-select>
                <!-- destination -->
                <q-select
                  hide-dropdown-icon
                  bg-color="white"
                  v-model="destination"
                  :options="destinationOptions"
                  style="width: 12rem">
                  <template v-slot:prepend>
                    <q-icon
                    name="place"
                    size="xs"
                    style="margin-left: 0.5rem"/>
                  </template>
                </q-select>
                <!-- departure date -->
                <q-select
                  hide-dropdown-icon
                  bg-color="white"
                  v-model="date"
                  :options="dateOptions"
                  style="width: 9rem">
                  <template v-slot:prepend>
                    <q-icon
                    name="event"
                    size="xs"
                    style="margin-left: 0.5rem"/>
                  </template>
                </q-select>
                <!-- number of passengers -->
                <q-select
                  hide-dropdown-icon
                  bg-color="white"
                  v-model="passenger"
                  :options="passengerOptions"
                  style="width: 10rem">
                  <template v-slot:prepend>
                    <q-icon
                      name="account_circle"
                      size="xs"
                      style="margin-left: 0.5rem"/>
                  </template>
                </q-select>
                <q-btn
                  no-caps
                  label="Search"
                  color="orange"
                  @click="searchTickets()"
                  style="width: 8rem; height: 3.5rem"/>
              </div>
            </div>
          </div>
        </q-img>
      </div>
    </div>
    <!-- body text boxes -->
    <div class="row justify-evenly body"
      style="width: 95%">
      <div class="text-h5">
        <strong>Millions of bus routes and destinations, one simple search</strong>
      </div>
    </div>
    <div class="row justify-evenly body"
      style="width: 100%">
      <div class="col-3 q-gutter-md text-center">
        <img
          src="statics/superfast.png"
          style="height: 3rem">
        <div class="text-h6">
          <strong>Your trip, your priorities</strong>
        </div>
        <div>On a budget? Tight schedule? Book tickets that fit your needs.</div>
      </div>
      <div class="col-3 q-gutter-md text-center">
        <img
          src="statics/mostoptions.png"
          style="height: 3rem">
        <div class="text-h6">
          <strong>Global coverage</strong>
        </div>
        <div>Save time by comparing all your bus travel options in one place.</div>
      </div>
      <div class="col-3 q-gutter-md text-center">
        <img
          src="statics/friendlycrew.png"
          style="height: 3rem">
        <div class="text-h6">
          <strong>24/7 support</strong>
        </div>
        <div>Our world-class team of bus experts is always here to help.</div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      origin: 'New York City',
      originOptions: ['New York City'],
      destination: 'Montréal',
      destinationOptions: ['Montréal'],
      date: 'Sun., Aug. 2',
      dateOptions: ['Sun., Aug. 2'],
      passenger: '1 passenger',
      passengerOptions: ['1 passenger']
    }
  },
  methods: {
    searchTickets () {
      this.$router.push({ path: '/search' })
    },
    frenchSite () {
      this.$router.push({ path: '/fr' })
    }
  }
}
</script>

<style lang="sass" scoped>
.header
  height: 25rem
  width: 100%
</style>
