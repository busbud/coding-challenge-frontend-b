import { combineReducers } from '@reduxjs/toolkit'
import { currencyReducer } from './currency'
import { searchReducer } from './search'
import { departuresReducer } from './departures'

const rootReducer = combineReducers({
  currency: currencyReducer,
  search: searchReducer,
  departures: departuresReducer,
})

export default rootReducer
