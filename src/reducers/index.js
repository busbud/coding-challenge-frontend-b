import {
	REQUEST_DEPARTURES, RECEIVE_DEPARTURES, RECEIVE_ERROR, UPDATE_SEARCH, ABORT_REQUEST
} from '../actions'

const initialState = {
	departures: [],
	from: 'New York',
	to: 'Montreal',
	date: new Date(2018, 7, 2)
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ABORT_REQUEST:
			return {
				...state,
				controller: null,
				isFetching: false,
				isError: false,
				departures: []
			}
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
				abortController: action.controller
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
