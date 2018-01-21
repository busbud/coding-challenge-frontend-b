import {
	REQUEST_DEPARTURES, RECEIVE_DEPARTURES, UPDATE_INPUT
} from '../actions'

const reducer = (state = {departures: [], from: 'New York', to: 'Montreal', date: new Date(2018, 7, 2)}, action) => {
	switch (action.type) {
		case UPDATE_INPUT:
			return {
				...state,
				[action.field]: action.value
			}
		case REQUEST_DEPARTURES:
			return {
				...state,
				isFetching: true
			}
		case RECEIVE_DEPARTURES:
			return {
				...state,
				isFetching: false,
				lastUpdate: action.receivedAt,
				departures: action.departures
			}
		default:
			return state
	}
}

export default reducer

