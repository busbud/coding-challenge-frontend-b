import {RECEIVE_DEPARTURES, RECEIVE_ERROR, REQUEST_DEPARTURES, UPDATE_SEARCH} from './types'
import reducer from './reducers'

describe('reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			departures: [],
			from: 'New York',
			to: 'Montreal',
			date: new Date(2018, 7, 2),
			currency: 'CAD'
		})
	})

	it('should handle UPDATE_SEARCH', () => {
		expect(reducer({from: 'A'}, {
			type: UPDATE_SEARCH,
			field: 'from',
			value: 'B'
		})).toEqual({
			from: 'B'
		})
	})

	it('should handle REQUEST_DEPARTURES', () => {
		expect(reducer({isError: true}, {
			type: REQUEST_DEPARTURES
		})).toEqual({
			isFetching: true,
			isError: false
		})
	})

	it('should handle RECEIVE_ERROR', () => {
		expect(reducer({isError: false}, {
			type: RECEIVE_ERROR,
			reason: 'because there is always one reason'
		})).toEqual({
			isFetching: false,
			isError: true,
			error: 'because there is always one reason'
		})
	})

	it('should handle RECEIVE_DEPARTURES', () => {
		expect(reducer({lastUpdate: 'before'}, {
			type: RECEIVE_DEPARTURES,
			isPartial: true,
			receivedAt: 'now',
			departures: []
		})).toEqual({
			isFetching: true,
			lastUpdate: 'now',
			departures: []
		})
	})
})
