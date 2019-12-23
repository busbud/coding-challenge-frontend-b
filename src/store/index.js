import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import BusbudGateway from '../busbudGateway';
import i18n from '../i18n';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tripInfo: {},
    departures: [],
    operators: [],
    locations: [],
    cities: [],
    currency: 'CAD',
    currencies: ['CAD', 'USD'],
    languages: [{ text: 'English', value: 'en' }, { text: 'Français', value: 'fr' }],
    cityOptions: [{ text: 'Montreal', value: 'f25dvk' }, { text: 'New York', value: 'dr5reg' }],
    loadingDepartures: false,
  },
  mutations: {
    SET_TRIP_INFO(state, tripInfo) {
      state.tripInfo = tripInfo;
    },
    APPEND_DEPARTURES(state, departures) {
      state.departures = state.departures.concat(departures);
    },
    SET_DEPARTURES(state, departures) {
      state.departures = departures;
    },
    RESET_DEPARTURES(state) {
      state.departures = [];
    },
    APPEND_OPERATORS(state, operators) {
      state.operators = state.operators.concat(operators);
    },
    RESET_OPERATORS(state) {
      state.operators = [];
    },
    APPEND_LOCATIONS(state, locations) {
      state.locations = state.locations.concat(locations);
    },
    RESET_LOCATIONS(state) {
      state.locations = [];
    },
    APPEND_CITIES(state, cities) {
      state.cities = state.cities.concat(cities);
    },
    RESET_CITIES(state) {
      state.cities = [];
    },
    SET_CURRENCY(state, currency) {
      state.currency = currency;
    },
    SET_LOADING_DEPARTURES(state, loading) {
      state.loadingDepatures = loading;
    },
  },
  actions: {
    async GET_TRIPS({ commit, dispatch, state },
      {
        origin,
        destination,
        outboundDate,
        numberAdults,
      }) {
      commit('SET_LOADING_DEPARTURES', true);
      dispatch('RESET_DEPARTURE_DATA');
      let index = 0;

      const query = `adult=${numberAdults}&currency=${state.currency}&lang=${i18n.locale}`;
      const pathParams = `${origin}/${destination}/${outboundDate}`;
      let data = (await BusbudGateway.get(`${pathParams}?${query}`)).data;

      commit('SET_TRIP_INFO', {
        origin,
        destination,
        outboundDate,
        numberAdults,
      });
      dispatch('APPEND_DEPARTURE_DATA', data);
      dispatch('SORT_BY_CHEAPEST');

      if (!data.complete) {
        index += data.departures.length;

        const interval = setInterval(async () => {
          data = (await BusbudGateway.get(`${pathParams}/poll?index=${index}&${query}`)).data;
          dispatch('APPEND_DEPARTURE_DATA', data);
          dispatch('SORT_BY_CHEAPEST');
          index += data.departures.length;
          if (data.complete) {
            clearInterval(interval);
            commit('SET_LOADING_DEPARTURES', false);
          }
        }, 1000);
      } else {
        commit('SET_LOADING_DEPARTURES', false);
      }
    },
    async UPDATE_CURRENCY({ state, dispatch, commit }, currency) {
      commit('SET_CURRENCY', currency);
      await dispatch('GET_TRIPS', state.tripInfo);
    },
    CREATE_DEPARTURE_DURATION({ commit }, departures) {
      const depWithDuration = departures.map((dep) => {
        const duration = moment.duration(
          moment(dep.arrival_time).diff(moment(dep.departure_time)),
        );
        return {
          ...dep,
          duration,
        };
      });
      commit('APPEND_DEPARTURES', depWithDuration);
    },
    SORT_BY_FASTEST({ commit, state }) {
      const departures = [...state.departures];
      departures.sort((a, b) => a.duration - b.duration);
      commit('SET_DEPARTURES', departures);
    },
    SORT_BY_CHEAPEST({ commit, state }) {
      const departures = [...state.departures];
      departures.sort((a, b) => a.prices.total - b.prices.total);
      commit('SET_DEPARTURES', departures);
    },
    SORT_BY_EARLIEST({ commit, state }) {
      const departures = [...state.departures];
      departures.sort((a, b) => moment(a.departure_time) - moment(b.departure_time));
      commit('SET_DEPARTURES', departures);
    },
    SORT_BY_LATEST({ commit, state }) {
      const departures = [...state.departures];
      departures.sort((a, b) => moment(b.departure_time) - moment(a.departure_time));
      commit('SET_DEPARTURES', departures);
    },
    RESET_DEPARTURE_DATA({ commit }) {
      commit('RESET_DEPARTURES');
      commit('RESET_OPERATORS');
      commit('RESET_CITIES');
      commit('RESET_LOCATIONS');
    },
    APPEND_DEPARTURE_DATA({ dispatch, commit }, data) {
      dispatch('CREATE_DEPARTURE_DURATION', data.departures);
      commit('APPEND_OPERATORS', data.operators);
      commit('APPEND_LOCATIONS', data.locations);
      commit('APPEND_CITIES', data.cities);
    },
  },
  getters: {
    departures: state => state.departures,
    operators: state => state.operators,
    locations: state => state.locations,
    cities: state => state.cities,
    currencies: state => state.currencies,
    currency: state => state.currency,
    languages: state => state.languages,
    cityOptions: state => state.cityOptions,
    loadingDepartures: state => state.loadingDepartures,
  },
});
