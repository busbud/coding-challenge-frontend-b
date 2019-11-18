import { combineReducers } from 'redux';
import { departuresReducer } from './departures';
import { langReducer } from './lang';

export default combineReducers({
  lang: langReducer,
  departures: departuresReducer
});
