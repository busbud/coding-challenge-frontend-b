import { combineReducers } from 'redux';
import translater from './translater';
import api from './api';

const allReducers = combineReducers({
  translater,
  api
});

export default allReducers;