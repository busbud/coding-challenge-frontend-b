import keyBy from 'lodash.keyby'
import {RECEIVE_DEPARTURES, RECEIVE_ERROR, REQUEST_DEPARTURES, UPDATE_SEARCH} from './types'

export const requestDepartures = (from, to, date, currency) => ({
	type: REQUEST_DEPARTURES,
	requestedAt: Date.now(),
	from,
	to,
	date,
	currency
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
		receivedAt: Date.now(),
		isPartial: !json.complete
	}
}

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
