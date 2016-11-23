import * as types from '../actions/actionTypes';
import moment from 'moment';

export default function queryReducer(state = {
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
		date: moment("2017-07-28"),
		currency: 'CAD'
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
