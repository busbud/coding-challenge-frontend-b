import { combineEpics } from 'redux-observable';
import { fetchEpic, pollEpic, successEpic } from './departuresEpic';

export default combineEpics(fetchEpic, pollEpic, successEpic);
