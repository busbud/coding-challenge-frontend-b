import { combineReducers } from "redux";
import { localeReducer as locale } from 'react-localize-redux';

import departures from './departuresReducer'

const rootReducer = combineReducers({
  departures,
  locale
})

export default rootReducer
