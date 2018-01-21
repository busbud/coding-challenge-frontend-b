import geocodes from '../geocodes'
import secretBusbudToken from '../busbudToken'

export const REQUEST_DEPARTURES = 'REQUEST_DEPARTURES'
export const UPDATE_INPUT = 'UPDATE_INPUT'
export const POLL_DEPARTURES = 'POLL_DEPARTURES'
export const FETCH_DEPARTURES = 'FETCH_DEPARTURES'
export const RECEIVE_DEPARTURES = 'RECEIVE_DEPARTURES'

// TODO: will arguments be needed ?
export const requestDepartures = (from, to, date) => ({
	type: REQUEST_DEPARTURES
})

export const receiveDepartures = json => ({
	type: RECEIVE_DEPARTURES,
	departures: json.departures,
	receivedAt: Date.now()
})

// TODO: maybe split into update{from, to, date}
export const updateSearch = (field, value) => ({
	type: UPDATE_INPUT,
	field,
	value
})

/**
 *
 * @param from {string}
 * @param to   {string}
 * @param date {Date}
 * @returns {function(*)}
 */
	// TODO: also handle errors
export const fetchDepartures = (from, to, date) => dispatch => {
	dispatch(requestDepartures())

	return fetch(`https://napi.busbud.com/x-departures/${geocodes[from]}/${geocodes[to]}/${date.toLocaleDateString('en-CA')}`, {
		method: 'GET',
		headers: new Headers({
			Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
			'X-Busbud-Token': secretBusbudToken
		})
	})
		.then(response => response.json())
		.then(json => dispatch(receiveDepartures(json)))
}
