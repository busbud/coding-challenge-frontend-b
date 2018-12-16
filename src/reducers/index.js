import { combineReducers } from 'redux';

import { Reducer as searchReducer } from '../domains/search';

export default combineReducers({
  search: searchReducer,
});
