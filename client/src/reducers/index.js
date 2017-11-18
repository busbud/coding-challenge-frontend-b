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
  /**
	 * Returns an index using the key as idx.
	 * Build in the old fashion way.
   * @param array The array to index
   * @param key The key to use as idx
   */
	let createIndex = (array, key) => {
		let ret = {};
		for (let i = 0; i < array.length; i++){
			ret[array[i][key]] = array[i];
		}
		return ret;
	}

	switch (action.type){
		case FETCH_DEPARTURES:
			return Object.assign({}, state, {
		        isFetching: true
		    })
    case RECEIVE_DEPARTURES:

      action.results.cityIdx = createIndex(action.results.cities, 'id');
      action.results.locationsIdx = createIndex(action.results.locations, 'id');
      action.results.operatorsIdx = createIndex(action.results.operators, 'id');
      action.results.departuresIdx = createIndex(action.results.departures, 'id');

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