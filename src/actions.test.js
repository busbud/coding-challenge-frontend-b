import {RECEIVE_DEPARTURES, RECEIVE_ERROR, REQUEST_DEPARTURES, UPDATE_SEARCH} from './types'
import * as actions from './actions'

describe('Actions', () => {
	it('should create an action to request departures', () => {
		Date.now = jest.fn().mockReturnValue('mocked')

		const from = 'A'
		const to = 'B'
		const date = new Date()
		const currency = 'CAD'

		const expectedAction = {
			type: REQUEST_DEPARTURES,
			from,
			to,
			date,
			currency,
			requestedAt: 'mocked'
		}
		expect(actions.requestDepartures(from, to, date, currency)).toEqual(expectedAction)
	})

	it('should create an action to receive errors from requests', () => {
		const reason = 'because'
		const expectedAction = {
			type: RECEIVE_ERROR,
			reason
		}
		expect(actions.receiveError(reason)).toEqual(expectedAction)
	})

	it('should create an action to receive departures', () => {
		Date.now = jest.fn().mockReturnValue('mocked')

		const operator = {id: 1, name: 'o'}
		/* eslint-disable camelcase */
		const origin_location = {id: 1, name: 'lA'}
		const destination_location = {id: 2, name: 'lB'}
		const json = {
			complete: true,
			operators: [operator],
			locations: [origin_location, destination_location],
			departures: [{
				origin_location_id: 1,
				destination_location_id: 2,
				operator_id: 1
			}]
		}
		const expectedDepartures = [{
			origin_location_id: 1,
			origin_location,
			destination_location_id: 2,
			destination_location,
			operator_id: 1,
			operator
		}]
		/* eslint-disable camelcase */
		const expectedAction = {
			type: RECEIVE_DEPARTURES,
			departures: expectedDepartures,
			receivedAt: 'mocked',
			isPartial: false
		}

		expect(actions.receiveDepartures(json)).toEqual(expectedAction)
	})

	it('should create an action to update search', () => {
		const field = 'f'
		const value = 'v'
		const expectedAction = {
			type: UPDATE_SEARCH,
			field,
			value
		}

		expect(actions.updateSearch(field, value)).toEqual(expectedAction)
	})
})
