import { fromJS, List, Map } from 'immutable'
import { combineReducers } from 'redux-immutablejs'

import * as localesActions from '../locales/actions'
import * as actions from './actions'

const citiesIdsInitial = List()

const citiesIds = (state = citiesIdsInitial, action) => {
  switch (action.type) {
    case actions.GET_POLLED_SCHEDULES_SUCCESS:
      return state.concat(action.cities.map(city => city.id))
    case actions.GET_SCHEDULES_SUCCESS:
      return fromJS(action.cities.map(city => city.id))
    case localesActions.CHANGE_LOCALE:
      return citiesIdsInitial
    default:
      return state
  }
}

const citiesByIdInitial = Map()

const citiesById = (state = citiesByIdInitial, action) => {
  switch (action.type) {
    case actions.GET_POLLED_SCHEDULES_SUCCESS:
      return state.mergeDeep(action.cities.reduce((mapCities, city) => ({
        ...mapCities,
        [city.id]: city,
      }), {}))
    case actions.GET_SCHEDULES_SUCCESS:
      return fromJS(action.cities.reduce((mapCities, city) => ({
        ...mapCities,
        [city.id]: city,
      }), {}))
    case localesActions.CHANGE_LOCALE:
      return citiesByIdInitial
    default:
      return state
  }
}

const departuresIdsInitial = List()

const departuresIds = (state = departuresIdsInitial, action) => {
  switch (action.type) {
    case actions.GET_POLLED_SCHEDULES_SUCCESS:
      return state.concat(action.departures.map(departure => departure.id))
    case actions.GET_SCHEDULES_SUCCESS:
      return fromJS(action.departures.map(departure => departure.id))
    case localesActions.CHANGE_LOCALE:
      return departuresIdsInitial
    default:
      return state
  }
}

const departuresByIdInitial = Map()

const departuresById = (state = departuresByIdInitial, action) => {
  switch (action.type) {
    case actions.GET_POLLED_SCHEDULES_SUCCESS:
      return state.mergeDeep(action.departures.reduce((mapDepartures, departure) => ({
        ...mapDepartures,
        [departure.id]: departure,
      }), {}))
    case actions.GET_SCHEDULES_SUCCESS:
      return fromJS(action.departures.reduce((mapDepartures, departure) => ({
        ...mapDepartures,
        [departure.id]: departure,
      }), {}))
    case localesActions.CHANGE_LOCALE:
      return departuresByIdInitial
    default:
      return state
  }
}

const locationsIdsInitial = List()

const locationsIds = (state = locationsIdsInitial, action) => {
  switch (action.type) {
    case actions.GET_POLLED_SCHEDULES_SUCCESS:
      return state.concat(action.locations.map(location => location.id))
    case actions.GET_SCHEDULES_SUCCESS:
      return fromJS(action.locations.map(location => location.id))
    case localesActions.CHANGE_LOCALE:
      return locationsIdsInitial
    default:
      return state
  }
}

const locationsByIdInitial = Map()

const locationsById = (state = locationsByIdInitial, action) => {
  switch (action.type) {
    case actions.GET_POLLED_SCHEDULES_SUCCESS:
      return state.mergeDeep(action.locations.reduce((mapLocations, location) => ({
        ...mapLocations,
        [location.id]: location,
      }), {}))
    case actions.GET_SCHEDULES_SUCCESS:
      return fromJS(action.locations.reduce((mapLocations, location) => ({
        ...mapLocations,
        [location.id]: location,
      }), {}))
    case localesActions.CHANGE_LOCALE:
      return locationsByIdInitial
    default:
      return state
  }
}

const operatorsIdsInitial = List()

const operatorsIds = (state = operatorsIdsInitial, action) => {
  switch (action.type) {
    case actions.GET_POLLED_SCHEDULES_SUCCESS:
      return state.concat(action.operators.map(operator => operator.id))
    case actions.GET_SCHEDULES_SUCCESS:
      return fromJS(action.operators.map(operator => operator.id))
    case localesActions.CHANGE_LOCALE:
      return operatorsIdsInitial
    default:
      return state
  }
}

const operatorsByIdInitial = Map()

const operatorsById = (state = operatorsByIdInitial, action) => {
  switch (action.type) {
    case actions.GET_POLLED_SCHEDULES_SUCCESS:
      return state.mergeDeep(action.operators.reduce((mapOperators, operator) => ({
        ...mapOperators,
        [operator.id]: operator,
      }), {}))
    case actions.GET_SCHEDULES_SUCCESS:
      return fromJS(action.operators.reduce((mapOperators, operator) => ({
        ...mapOperators,
        [operator.id]: operator,
      }), {}))
    case localesActions.CHANGE_LOCALE:
      return operatorsByIdInitial
    default:
      return state
  }
}

const schedulesLoadingInitial = false

const schedulesLoading = (state = schedulesLoadingInitial, action) => {
  switch (action.type) {
    case actions.GET_SCHEDULES_REQUEST:
      return true
    case actions.GET_POLLED_SCHEDULES_SUCCESS:
    case actions.GET_SCHEDULES_SUCCESS:
      return action.isLoading
    default:
      return state
  }
}

const cities = combineReducers({
  ids: citiesIds,
  byId: citiesById,
})

const departures = combineReducers({
  ids: departuresIds,
  byId: departuresById,
})

const locations = combineReducers({
  ids: locationsIds,
  byId: locationsById,
})

const operators = combineReducers({
  ids: operatorsIds,
  byId: operatorsById,
})

export const schedules = combineReducers({
  cities,
  departures,
  isLoading: schedulesLoading,
  locations,
  operators,
})

