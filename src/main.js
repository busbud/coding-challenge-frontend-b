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
import vuexI18n from 'vuex-i18n'
import i18nEn from './i18n/en.json'
import i18nFr from './i18n/fr.json'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueMoment, {
  moment
})
Vue.use(Vuex)

// create store
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    travels: {},
    search: {
      /**
       * true to indicate if there were issues loading data
       */
      error: false,
      /**
       * handle referencing the task that polls travels
       */
      pollingTaskHandle: undefined,
      /**
       * interval in seconds used by the poll travels task
       */
      pollingIntervalSeconds: 3,
      /**
       * indicate if data fetching is in progress or not
       */
      inProgress: false,
      /**
       * related to search parameters
       */
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
    /**
     * change locale
     * @param state
     * @param locale
     */
    setLocale (state, locale) {
      state.search.parameters.lang = locale.toUpperCase()
    },
    /**
     * indicate the search is finished
     * @param state
     */
    searchFinished (state) {
      state.search.inProgress = false
      if (state.search.pollingTaskHandle) {
        clearInterval(state.search.pollingTaskHandle)
        state.search.pollingTaskHandle = undefined
      }
    },
    /**
     * indicate that the search failed
     * @param state
     */
    searchFailed (state) {
      state.search.error = true
      state.search.inProgress = false
      if (state.search.pollingTaskHandle) {
        clearInterval(state.search.pollingTaskHandle)
        state.search.pollingTaskHandle = undefined
      }
    },
    /**
     * set the travels in the state
     * @param state
     * @param travels
     */
    setTravels (state, travels) {
      state.travels = travels
    },
    /**
     * cpmplete the travels with departures and operators
     * @param state
     * @param departures
     * @param operators
     */
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
    /**
     * reinitialize search => clear travels
     * @param state
     */
    reinitSearch (state) {
      state.travels = {}
      state.search.inProgress = true
      state.search.error = false

      if (state.search.pollingTaskHandle) {
        clearInterval(state.search.pollingTaskHandle)
      }
    },
    /**
     * set the polling task handle
     * @param state
     * @param handle
     */
    setPollingTaskHandle (state, handle) {
      state.search.pollingTaskHandle = handle
    },
    /**
     * update count of adults
     * @param state
     * @param value
     */
    updateAdult (state, value) {
      state.search.parameters.adult = value
    },
    /**
     * update count of seniors
     * @param state
     * @param value
     */
    updateSenior (state, value) {
      state.search.parameters.senior = value
    },
    /**
     * update count of children
     * @param state
     * @param value
     */
    updateChild (state, value) {
      state.search.parameters.child = value
    },
    /**
     * update currency
     * @param state
     * @param value
     */
    updateCurrency (state, value) {
      state.search.parameters.currency = value
    },
    /**
     * update date of search
     * @param state
     * @param value
     */
    updateDate (state, value) {
      state.search.parameters.date = value
    }
  },
  actions: {
    /**
     * launch search
     * @param context
     */
    search (context) {
      context.commit('reinitSearch')

      travelService.fetchTravels(context.state.search.parameters)
        .then((response) => {
          console.log('fetching travels finished (complete?' + response.data.complete + ')')
          context.commit('setTravels', response.data)

          if (response.data.complete) {
            context.commit('searchFinished')
          } else {
            const handle = setInterval(function () {
              // if we get data from the initial API call, then poll departures and operators
              if (context.state.travels && context.state.travels.departures) {
                travelService.pollTravels(context.state.search.parameters, context.state.travels.departures).then((response) => {
                  console.log('polling travels finished (complete?' + response.data.complete + ')')
                  context.commit('completeTravels', response.data.departures, response.data.operators)

                  if (response.data.complete) {
                    context.commit('searchFinished')
                  }
                }, (e) => {
                  context.commit('searchFailed')
                  console.log('error', e)
                })
              }
            }, context.state.search.pollingIntervalSeconds * 1000)
            context.commit('setPollingTaskHandle', handle)
          }
        }, (e) => {
          context.commit('searchFailed')
          console.log('error', e)
        })
    }
  }
})

// i18n configuration
Vue.use(vuexI18n.plugin, store)
Vue.i18n.add('en', i18nEn)
Vue.i18n.add('fr', i18nFr)
Vue.i18n.set('en')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
