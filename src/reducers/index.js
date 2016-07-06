import { combineReducers } from 'redux';
import translater from './translater';
import currency from './currency';
import api from './api';

const allReducers = combineReducers({
  translater,
  currency,
  api
});

export default allReducers;