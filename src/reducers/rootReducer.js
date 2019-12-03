// third-party libraries
import { combineReducers } from 'redux';

// reducers
import { fetching } from './fetchingReducer'
import { departures } from './departureReducer'


const combinedReducers = combineReducers({
  fetching,
  departures
});

export default combinedReducers;
