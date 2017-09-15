import { combineReducers } from "redux";

import departures from './departuresReducer'

const rootReducer = combineReducers({
  departures
})

export default rootReducer
