import keyBy from 'lodash/keyBy'
import geocodes from '../utils/geocodes'
import timeout from '../utils/timeout'
import {formatDate} from '../utils/formatters'

export const REQUEST_DEPARTURES = 'REQUEST_DEPARTURES'
export const RECEIVE_ERROR = 'RECEIVE_ERROR'
export const RECEIVE_DEPARTURES = 'RECEIVE_DEPARTURES'
export const UPDATE_SEARCH = 'UPDATE_SEARCH'

/**
 * @param isPolling {boolean} not used yet
 * @returns {{type: string, isPolling: boolean}}
 */
export const requestDepartures = isPolling => ({
	type: REQUEST_DEPARTURES,
	isPolling
})

// Exported for tests only
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
		receivedAt: Date.now(),
		isPartial: !json.complete
	}
}

// Exported for tests only
export const receiveError = reason => ({
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
 * This does not create an action, but it dispatch actions. Handling the dispatch function may not be the best way of
 * doing it. TODO: find a better way!
 *
 * @param from     {string}
 * @param to       {string}
 * @param date     {Date}
 * @param dispatch {function} allow this to dispatch some actions
 * @param poll     {boolean}  used to recurse until request is done
 * @param waitTime {number}   time to wait between polls. It should
 *                            be between 2000 and 5000, except for tests
 */
export const fetchDepartures = async (from, to, date, dispatch, poll = false, waitTime = 2000) => {
	dispatch(requestDepartures())
	let url = `https://napi.busbud.com/x-departures/${geocodes[from]}/${geocodes[to]}/${formatDate(date)}`
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
		dispatch(receiveError(json.error.details))
	} else if (json.complete === false) {
		dispatch(receiveDepartures(json))
		await timeout(waitTime)
		await fetchDepartures(from, to, date, dispatch, true)
	} else {
		dispatch(receiveDepartures(json))
	}
}
