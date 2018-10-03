import { combineReducers } from 'redux';
import DataReducer from './reducer_data';

const rootReducer = combineReducers({
  results: DataReducer
});

export default rootReducer;