import { all, call, select, takeLatest, put, takeEvery } from 'redux-saga/effects';
import { ApiConfiguration } from '../../configuration';

import { getsearchQuery } from './selectors';
import { sagaRequest } from '../../helpers';

import { ActionTypes } from './index';

import * as ActionCreators from './actionCreators';

// WORKERS

export function* getResultsWorker() {
  const { filter, value, page } = yield select(getsearchQuery);

  const workingPage = page || 1;
  let url = `${ApiConfiguration.search}`;
  const terms = value.replace(' ', '+');
  if (filter !== 'all') {
    url = `${url}${filter}=${terms}`;
  } else {
    url = `${url}q=${terms}`;
  }

  url = `${url}&page=${workingPage}`;

  yield call(sagaRequest, ActionTypes.PERFORM_SEARCH, url, {
    method: 'GET',
  });
}

export function* peformSepecificSearchWorker({ payload }) {
  const { filter, value } = yield select(getsearchQuery);

  let workingPage = payload.page;

  if ((filter && filter !== payload.filter) || (value && value !== payload.value)) {
    workingPage = 1;
  }

  let workingFilter = payload.filter || filter;

  if (!workingFilter) {
    workingFilter = payload.filter;
  }

  yield put(ActionCreators.updateSearchQuery({
    value: payload.value,
    page: parseInt(workingPage, 10),
    filter: workingFilter,
  }));
  yield put(ActionCreators.performSearch());
}

// WATCHERS

function* getResultsWatcher() {
  yield takeLatest(ActionTypes.PERFORM_SEARCH.BASE, getResultsWorker);
}

function* peformSepecificSearchWatcher() {
  yield takeEvery(ActionTypes.PERFORM_SPECIFIC_SEARCH, peformSepecificSearchWorker);
}

// DEFAULT
export default function* searchSaga() {
  yield all([getResultsWatcher(), peformSepecificSearchWatcher()]);
}
