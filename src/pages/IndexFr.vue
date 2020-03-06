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
                label="Français (Canada)"
                icon-right="keyboard_arrow_down">
                <q-menu>
                  <q-list
                    style="min-width: 100px">
                    <q-item
                      clickable
                      v-close-popup>
                      <q-item-section
                        @click="englishSite()">English (Canada)</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup>
                      <q-item-section>Français (Canada)</q-item-section>
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
                <strong>Trouvez des billets de bus pour </strong>
                <img
                  src="statics/osheaga.png"
                  style="height: 6rem; padding-top: 2rem">
              </div>
              <div>
                Montréal, Canada - 31 Juillet  - 2 Août
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
        <strong>Des millions de trajets et destinations en une simple recherche</strong>
      </div>
    </div>
    <div class="row justify-evenly body"
      style="width: 100%">
      <div class="col-3 q-gutter-md text-center">
        <img
          src="statics/superfast.png"
          style="height: 3rem">
        <div class="text-h6">
          <strong>Votre déplacement, vos priorités</strong>
        </div>
        <div>Budget limité? Délais serrés? Réservez les billets qui correspondent à vos besoins.</div>
      </div>
      <div class="col-3 q-gutter-md text-center">
        <img
          src="statics/mostoptions.png"
          style="height: 3rem">
        <div class="text-h6">
          <strong>Réseau mondial</strong>
        </div>
        <div>Gagnez du temps en comparant toutes vos options de trajet au même endroit.</div>
      </div>
      <div class="col-3 q-gutter-md text-center">
        <img
          src="statics/friendlycrew.png"
          style="height: 3rem">
        <div class="text-h6">
          <strong>Assistance 24 h/24, 7 j/7</strong>
        </div>
        <div>Notre équipe d'experts en bus hautement qualifiés se tient toujours à votre disposition.</div>
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
      date: 'Dim. 2 Août',
      dateOptions: ['Dim. 2 Août'],
      passenger: '1 passager',
      passengerOptions: ['1 passager']
    }
  },
  methods: {
    searchTickets () {
      this.$router.push({ path: '/search' })
    },
    englishSite () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="sass" scoped>
.header
  height: 25rem
  width: 100%
</style>
