import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux'; //might need to remove
// import { routerStateReducer } from 'redux-react-router';

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
 				return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
			case types.RECV_POLL_DATA:
				return Object.assign({}, state, {
					isLoading: false,
					data: {
						...action.data,
						departures: [
							...state.data.departures,
							...action.data.departures
						],
						operators: [
							...state.data.operators,
							...action.data.operators
						]
					},
					error: false
				});
 			case types.REQ_POLL_DATA:
 				return Object.assign({}, state, {isLoading: true, error: false });
 			default:
 				return state;
 		}
 	}


function queryReducer(state = {
	isLoading: false,
	data: {
		departures: [],
		operators: [],
		locations: [],
	},
	error: false}
, action = null) {
	switch(action.type) {
		case types.RECV_ERROR:
			return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
		case types.RECV_DATA:
			return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
		case types.REQ_DATA:
			return Object.assign({}, state, {isLoading: true, error: false });

		default:
			return state;
	}
}

const rootReducer = combineReducers({
	initialQuery: queryReducer,
	poll: pollReducer
});

export default rootReducer;
