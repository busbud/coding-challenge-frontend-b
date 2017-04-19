import * as types from '../actions/actionTypes';

export default function pollReducer(state = {
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
						// it seems to me that merging past poll results in duplicate results...
            // need more information from API docs.
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
