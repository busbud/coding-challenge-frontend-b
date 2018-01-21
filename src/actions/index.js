import keyBy from 'lodash/keyBy'
import geocodes from '../utils/geocodes'

export const REQUEST_DEPARTURES = 'REQUEST_DEPARTURES'
export const UPDATE_INPUT = 'UPDATE_INPUT'
export const POLL_DEPARTURES = 'POLL_DEPARTURES'
export const FETCH_DEPARTURES = 'FETCH_DEPARTURES'
export const RECEIVE_DEPARTURES = 'RECEIVE_DEPARTURES'

// TODO: will arguments be needed ?
export const requestDepartures = (from, to, date) => ({
	type: REQUEST_DEPARTURES
})

export const receiveDepartures = json => {
	const operators = keyBy(json.operators, 'id')
	const locations = keyBy(json.locations, 'id')

	const departures = json.departures.map(departure => ({
		...departure,
		// eslint-disable-next-line camelcase
		destination_location: locations[departure.destination_location_id],
		// eslint-disable-next-line camelcase
		origin_location: locations[departure.origin_location_id],
		operator: operators[departure.operator_id]

	}))

	return {
		type: RECEIVE_DEPARTURES,
		departures,
		receivedAt: Date.now()
	}
}

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
export const fetchDepartures = (from, to, date) => dispatch => {
	dispatch(requestDepartures())
	return fetch(`https://napi.busbud.com/x-departures/${geocodes[from]}/${geocodes[to]}/${date.toLocaleDateString('en-CA')}`, {
		method: 'GET',
		headers: new Headers({
			Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
			'X-Busbud-Token': process.env.REACT_APP_BUSBUD_TOKEN
		})
	})
		.then(response => response.json())
		.then(json => dispatch(receiveDepartures(json)))
}
