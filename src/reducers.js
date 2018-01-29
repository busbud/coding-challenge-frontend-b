import {
	RECEIVE_DEPARTURES,
	RECEIVE_ERROR,
	REQUEST_DEPARTURES,
	UPDATE_SEARCH
} from './types'

const initialState = {
	departures: [],
	from: 'New York',
	to: 'Montreal',
	currency: 'CAD',
	date: new Date(2018, 7, 2)
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_SEARCH:
			return {
				...state,
				[action.field]: action.value
			}
		case REQUEST_DEPARTURES:
			return {
				...state,
				isFetching: true,
				isError: false,
				requestedAt: action.requestedAt
			}
		case RECEIVE_ERROR:
			return {
				...state,
				isFetching: false,
				isError: true,
				error: action.reason
			}
		case RECEIVE_DEPARTURES:
			return {
				...state,
				isFetching: action.isPartial,
				lastUpdate: action.receivedAt,
				departures: action.departures
			}
		default:
			return state
	}
}

export default reducer
