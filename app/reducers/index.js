import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';
import pollReducer from './poll';
import queryReducer from './query';

const rootReducer = combineReducers({
	initialQuery: queryReducer,
	poll: pollReducer
});

export default rootReducer;
