import { combineReducers } from 'redux'

import {
	FETCH_DEPARTURES,
	RECEIVE_DEPARTURES
} from '../actions'

function results(
	state = {
		isFetching: false,
		items: null
	},
	action
){
	switch (action.type){
		case FETCH_DEPARTURES:
			return Object.assign({}, state, {
		        isFetching: true
		    })
    case RECEIVE_DEPARTURES:
      // @TODO: transform the results into usable results
			return Object.assign({}, state, {
		        isFetching: false,
		        items: action.results,
		        lastUpdated: action.receivedAt
		      })
		default:
			return state
	}
}

const rootReducers = combineReducers({
	results
})


export default rootReducers