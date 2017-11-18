import fetch from 'cross-fetch'

export const FETCH_DEPARTURES = 'FETCH_DEPARTURES'

export function requestResults(results){
	return {
		type: FETCH_DEPARTURES,
		results: results
	}

}

export function fetchResults(results){

	let searchResults

	let request = function () {
    // dispatch(requestResults(results))
    // @TODO The url must come from a config file
    return fetch(`http://localhost:8080/busbud`)
		.then(
			response => response.json(),
			error => console.log('An error occurred.', error)
		)
		.then(function(results){
			// Recursive if not complete
			if(searchResults){
				// Merging results
        searchResults = {...searchResults, results}
			}else{
				searchResults = results
			}
			if(results.complete){
				return (searchResults)
			}else{
				return request()
			}
		})
  }

  return function (dispatch) {
    dispatch(requestResults(results))
    return request().then(json => dispatch(receiveResults(results, json)))
  }

}

export const RECEIVE_DEPARTURES = 'RECEIVE_DEPARTURES'

function receiveResults(results, json){
	return {
		type: RECEIVE_DEPARTURES,
		results : json,
		receivedAt: Date.now()
	}
}