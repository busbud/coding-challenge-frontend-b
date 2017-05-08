import { combineReducers } from 'redux';
import search from './searchReducer';
import results from './searchResultsReducer'

const rootReducer = combineReducers({
  search,
  results,
})

export default rootReducer