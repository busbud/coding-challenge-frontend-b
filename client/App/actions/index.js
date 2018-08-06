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
    type: 'UPDATE_SEARCH_RESULTS_SUCCESS',
    cities: results.cities,
    locations: results.locations,
    operators: results.operators,
    departures: results.departures
  }
}

export function updateSearchResultsErrored () {
  return {
    type: 'UPDATE_SEARCH_RESULTS_ERRORED'
  }
}

export function updateSearchResults () {
  return async function (dispatch, getState) {
    const currentState = getState()
    try {
      dispatch(updateSearchResultsStart())
      const results = await departures.search(currentState.inputs)
      dispatch(updateSearchResultsSuccess(results))
    } catch (error) {
      console.error(
        'failed to fetch departures with inputs:', currentState.inputs
      )
      dispatch(updateSearchResultsErrored())
      throw error
    }
  }
}
