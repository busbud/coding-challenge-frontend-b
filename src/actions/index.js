import keyBy from 'lodash/keyBy'
import geocodes from '../utils/geocodes'
import timeout from '../utils/timeout'

export const REQUEST_DEPARTURES = 'REQUEST_DEPARTURES'
export const RECEIVE_ERROR = 'RECEIVE_ERROR'
export const RECEIVE_DEPARTURES = 'RECEIVE_DEPARTURES'
export const UPDATE_SEARCH = 'UPDATE_SEARCH'

/**
 * @param polling {boolean} not used yet
 * @returns {{type: string, polling: boolean}}
 */
export const requestDepartures = polling => ({
	type: REQUEST_DEPARTURES,
	polling
})

const receiveDepartures = json => {
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

const receiveError = reason => ({
	type: RECEIVE_ERROR,
	reason
})

// TODO: maybe split into update{from, to, date}
export const updateSearch = (field, value) => ({
	type: UPDATE_SEARCH,
	field,
	value
})

/**
 *
 * @param from {string}
 * @param to   {string}
 * @param date {Date}
 * @param poll {boolean} used to recurse until request is done
 * @returns {function(*)}
 */
export const fetchDepartures = (from, to, date, poll = false) => async dispatch => {
	dispatch(requestDepartures())
	let url = `https://napi.busbud.com/x-departures/${geocodes[from]}/${geocodes[to]}/${date.toLocaleDateString('en-CA')}`
	if (poll) {
		url += '/poll'
	}
	const fetchParams = {
		method: 'GET',
		headers: new Headers({
			Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
			'X-Busbud-Token': process.env.REACT_APP_BUSBUD_TOKEN
		})
	}

	const response = await fetch(url, fetchParams)
	const json = await response.json()

	if (!response.ok) {
		return dispatch(receiveError(json.error.details))
	}

	if (json.complete === false) {
		await timeout(2000)
		return dispatch(fetchDepartures(from, to, date, true))
	}

	return dispatch(receiveDepartures(json))
}
