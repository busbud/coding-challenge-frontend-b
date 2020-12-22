import { combineReducers } from "redux";
import {reducer as departures} from './departures';
import {reducer as busy} from './busy';


const rootReducer = combineReducers({
  departures,
  busy
});

export default rootReducer;
