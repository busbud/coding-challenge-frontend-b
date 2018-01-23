import keyBy from 'lodash/keyBy'
import geocodes from '../utils/geocodes'
import timeout from '../utils/timeout'
import {formatDate} from '../utils/formatters'

export const ABORT_REQUEST = 'ABORT_REQUEST'
export const REQUEST_DEPARTURES = 'REQUEST_DEPARTURES'
export const RECEIVE_ERROR = 'RECEIVE_ERROR'
export const RECEIVE_DEPARTURES = 'RECEIVE_DEPARTURES'
export const UPDATE_SEARCH = 'UPDATE_SEARCH'

export const abortRequest = controller => {
	controller.abort()
	return {
		type: ABORT_REQUEST
	}
}

/**
 * @param controller {AbortController} allows to abort fetch request
 * @returns {Object}
 */
export const requestDepartures = controller => ({
	type: REQUEST_DEPARTURES,
	controller
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
 * doing it. TODO: find a better way! maybe by separating the recursion from the main function
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
	const controller = new window.AbortController()
	dispatch(requestDepartures(controller))
	await fetchDeparturesInternal(from, to, date, dispatch, poll, controller.signal, waitTime)
}

const fetchDeparturesInternal = async (from, to, date, dispatch, poll, signal, waitTime) => {
	let url = `https://napi.busbud.com/x-departures/${geocodes[from]}/${geocodes[to]}/${formatDate(date)}`
	if (poll) {
		url += '/poll'
	}
	const fetchParams = {
		signal,
		method: 'GET',
		headers: new Headers({
			Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
			'X-Busbud-Token': process.env.REACT_APP_BUSBUD_TOKEN
		})
	}

	try {
		const response = await fetch(url, fetchParams)
		const json = await response.json()

		if (!response.ok) {
			dispatch(receiveError(json.error.details))
		} else if (json.complete === false) {
			dispatch(receiveDepartures(json))
			await timeout(waitTime)
			await fetchDeparturesInternal(from, to, date, dispatch, true, signal)
		} else {
			dispatch(receiveDepartures(json))
		}
	} catch (err) {
		if (err.name === 'AbortError') {
			return
		}
		throw err
	}
}
