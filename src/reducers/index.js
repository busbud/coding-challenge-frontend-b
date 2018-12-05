import { combineReducers } from 'redux';
import departures from './departures';
import locations from './locations';

export const reducers = combineReducers({
    departures,
    locations
})