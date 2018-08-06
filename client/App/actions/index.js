import departures from '../services/departures'

export function updateSearchInputs (inputs) {
  return {
    type: 'UPDATE_SEARCH_INPUTS',
    inputs
  }
}

export function updateSearchResultsStart () {
  return {
    type: 'UPDATE_SEARCH_RESULTS_START'
  }
}

export function updateSearchResultsSuccess (results) {
  return {
    type: 'UPDATE_SEARCH_RESULTS_SUCCESS'
  }
}

export function updateSearchResultsErrored () {
  return {
    type: 'UPDATE_SEARCH_RESULTS_ERRORED'
  }
}

export function updateSearchResults (results) {
  return {
    type: 'UPDATE_SEARCH_RESULTS',
    cities: results.cities || [],
    locations: results.locations || [],
    operators: results.operators || [],
    departures: results.departures || []
  }
}

export function fetchDepartures (poll = false) {
  return async function (dispatch, getState) {
    const currentState = getState()
    try {
      if (!poll) {
        dispatch(updateSearchResultsStart())
      }
      const results = await departures.search({
        origin: currentState.inputs.originCity.geohash,
        destination: currentState.inputs.destinationCity.geohash,
        date: currentState.inputs.date,
        poll: poll
      })

      dispatch(updateSearchResults(results))
      if (!results.complete) {
        dispatch(fetchDepartures(true))
      } else {
        dispatch(updateSearchResultsSuccess(results))
      }
    } catch (error) {
      console.error(
        'failed to fetch departures with inputs:', currentState.inputs
      )
      dispatch(updateSearchResultsErrored())
      throw error
    }
  }
}
