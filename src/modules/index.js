import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import departures from './departures';
import cities from './cities';
import locations from './locations';
import operators from './operators';

export default combineReducers({
  routing: routerReducer,
  departures,
  cities,
  locations,
  operators
});
