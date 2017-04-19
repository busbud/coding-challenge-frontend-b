import { combineReducers } from 'redux';
import translater from './translater';
import currency from './currency';
import api from './api';
import sort from './sort';

const allReducers = combineReducers({
  translater,
  currency,
  api,
  sort
});

export default allReducers;