import {
	REQUEST_DEPARTURES, RECEIVE_DEPARTURES, RECEIVE_ERROR, UPDATE_SEARCH
} from '../actions'

const reducer = (state = {departures: [], from: 'New York', to: 'Montreal', date: new Date(2018, 7, 2)}, action) => {
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
				isError: false
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

