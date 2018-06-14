// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import travelService from './service/travelService'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueMoment, {
  moment
})
Vue.use(Vuex)
Vue.use(VueI18n)

// create store
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    travels: {},
    search: {
      pollingTaskHandle: undefined,
      pollingIntervalSeconds: 10,
      inProgress: false,
      parameters: {
        geoHashOrigin: 'dr5reg',
        geoHashDestination: 'f25dvk',
        date: new Date(2018, 8, 2, 0, 0, 0, 0),
        adult: 1,
        child: 0,
        senior: 0,
        lang: 'EN',
        currency: 'USD'
      }
    }
  },
  mutations: {
    searchFinished (state) {
      state.search.inProgress = false
      clearInterval(state.search.pollingTaskHandle)
      state.search.pollingTaskHandle = undefined
    },
    setTravels (state, travels) {
      state.travels = travels
    },
    completeTravels (state, departures, operators) {
      // append departures
      if (departures && departures.length > 0) {
        state.travels.departures = state.travels.departures.concat(departures)
      }

      // append operators
      if (operators && operators.length > 0) {
        state.travels.operators = state.travels.operators.concat(operators)
      }
    },
    reinitSearch (state) {
      state.travels = {}
      state.search.inProgress = true

      if (state.search.pollingTaskHandle) {
        clearInterval(state.search.pollingTaskHandle)
      }
    },
    setPollingTaskHandle (state, handle) {
      state.search.pollingTaskHandle = handle
    },
    updateAdult (state, value) {
      state.search.parameters.adult = value
    },
    updateSenior (state, value) {
      state.search.parameters.senior = value
    },
    updateChild (state, value) {
      state.search.parameters.child = value
    },
    updateCurrency (state, value) {
      state.search.parameters.currency = value
    },
    updateDate (state, value) {
      state.search.parameters.date = value
    }
  },
  actions: {
    search (context) {
      context.commit('reinitSearch')

      travelService.fetchTravels(context.state.search.parameters)
        .then((response) => {
          context.commit('setTravels', response.data)
        })

      const handle = setInterval(function () {
        // if we get data from the initial API call, then poll departures and operators
        if (context.state.travels && context.state.travels.departures) {
          travelService.pollTravels(context.state.search.parameters, context.state.travels.departures).then((response) => {
            context.commit('completeTravels', response.data.departures, response.data.operators)

            if (response.data.complete) {
              context.commit('searchFinished')
            }
          })
        }
      }, context.state.search.pollingIntervalSeconds * 1000)
      context.commit('setPollingTaskHandle', handle)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
