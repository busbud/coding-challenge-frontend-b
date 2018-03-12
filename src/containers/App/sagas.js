import { delay } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import takeFirst from '../../utils/takeFirst';
import { FETCH_DEPARTURES } from './constants';
import { fetchDeparturesSuccess, fetchDeparturesError, fetchDeparturesComplete } from './actions';
import { makeSelectQuery, makeSelectComplete } from './selectors';
import { fetchXDepartures } from '../../services/api';

export const POOLING_DELAY = 1000;

export function* fetchDepartures() {
  const { path, params } = yield select(makeSelectQuery());
  let complete = null;

  while (!complete) {
    try {
      const { data } = yield call(fetchXDepartures, path, params, complete);
      yield put(fetchDeparturesSuccess(data));
      complete = yield select(makeSelectComplete());
      yield call(delay, POOLING_DELAY);
    } catch (err) {
      yield put(fetchDeparturesError());
      complete = true;
    }
  }
  yield put(fetchDeparturesComplete());
}

export default function* root() {
  yield takeFirst(FETCH_DEPARTURES, fetchDepartures);
}
