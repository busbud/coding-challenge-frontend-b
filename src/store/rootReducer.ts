import { combineReducers } from 'redux';
import { todoReducer } from './todo';

export default combineReducers({
  todos: todoReducer
});
