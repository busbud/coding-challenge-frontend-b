import { combineReducers } from 'redux'
import { i18nState }       from "redux-i18n"
import apiData             from './api_data'
import currentSearch       from './current_search'

const combinedReducer = combineReducers({
  i18nState,
  apiData,
  currentSearch,
})

export default combinedReducer