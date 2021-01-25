import { combineReducers } from '@reduxjs/toolkit'
import { currencyReducer } from './currency'
import { searchReducer } from './search'

const rootReducer = combineReducers({
  currency: currencyReducer,
  search: searchReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
