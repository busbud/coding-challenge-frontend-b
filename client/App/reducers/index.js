const initialState = {
  state: 'INIT', // INIT, LOADING, LOADED, ERRORED, EXPIRED
  inputs: {
    originCity: {
      geohash: 'dr5reg',
      name: 'New York'
    },
    destinationCity: {
      geohash: 'f25dvk',
      name: 'Montréal'
    },
    date: new Date(2018, 8, 1), // Setting imaginary festival date
    adults: 1,
    children: 0,
    senior: 0,
    lang: 'US',
    currency: 'USD'
  },
  results: {
    cities: [],
    locations: [],
    operators: [],
    departures: []
  }
}

const store = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_INPUTS':
      return {
        ...state,
        inputs: {
          ...action.inputs
        }
      }
    case 'UPDATE_SEARCH_RESULTS_START':
      return {
        ...state,
        state: 'LOADING'
      }
    case 'UPDATE_SEARCH_RESULTS_SUCCESS':
      return {
        ...state,
        state: 'LOADED'
      }
    case 'UPDATE_SEARCH_RESULTS_ERRORED':
      return {
        ...state,
        state: 'ERRORED'
      }
    case 'UPDATE_SEARCH_RESULTS':
      return {
        ...state,
        results: {
          ...state.results,
          cities: action.cities || [],
          locations: action.locations || [],
          operators: action.operators || [],
          departures: action.departures || []
        }
      }
    default:
      return state
  }
}

export default store
