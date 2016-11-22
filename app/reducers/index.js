import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux'; //might need to remove
import moment from 'moment';

function pollReducer(state = {
	isLoading: false,
	data: {
		departures: [],
		operators: [],
	},
	error: false},
	 action = null) {
		 switch(action.type) {
 			case types.RECV_POLL_ERROR:
				return {
					...state,
					isLoading: false,
					data: action.data,
					error: true
				};
			case types.RECV_POLL_DATA:
				return {
					...state,
					isLoading: false,
					data: {
						...action.data,
						// check if we have to merge the contents of past requests...
						// departures: [
						// 	...state.data.departures,
						// 	...action.data.departures
						// ],
						// operators: [
						// 	...state.data.operators,
						// 	...action.data.operators
						// ]
					},
					error: false
				};
 			case types.REQ_POLL_DATA:
				return {
					...state,
					isLoading: true,
					error: false,
				};
 			default:
 				return state;
 		}
 	}


function queryReducer(state = {
	isLoading: false,
	params: {
		origin: {
			name: 'New York',
			geohash: 'dr5reg'
		},
		destination: {
			name: 'Montreal',
			geohash: 'f25dvk'
		},
		date: moment("2017-07-21")
	},
	data: {
		departures: [],
		operators: [],
		locations: [],
	},
	error: false}
, action = null) {
	switch(action.type) {
		case types.RECV_ERROR:
			return {
				...state,
				isLoading: false,
				data: action.data,
				error: true,
			};
		case types.RECV_DATA:
			return {
				...state,
				isLoading: false,
				data: action.data,
				error: false,
			};
		case types.REQ_DATA:
			return {
				...state,
				isLoading: true,
				error: false
			};

		default:
			return state;
	}
}

const rootReducer = combineReducers({
	initialQuery: queryReducer,
	poll: pollReducer
});

export default rootReducer;
