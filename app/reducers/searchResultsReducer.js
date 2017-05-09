import {
  ADD_SEARCH_PARAMS,
  FETCHING_BUS_SCHEDULE,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from '../actions/types'

// For each departure, we want, at least,
// to see the departure time, the arrival
// time, the location name and the price
// (use prices.total of the departure).

const initialState = {
  lastUpdated: false,
  departures: []
}

const results = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SUCCESS :
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        departures: action.payload
      }
    default :
      return state
  }
}

export default results


