import { combineReducers } from 'redux';
import { reducer } from './reducers/departures';
import { reducer as busy } from './reducers/busy';

export default combineReducers({
  departures: reducer,
  busy,
});
