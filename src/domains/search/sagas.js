import {
  all, call, takeLatest, put,
} from 'redux-saga/effects';

import { delay } from 'redux-saga';
import { getOr, get } from 'lodash/fp';
import { Api } from '../../helpers/ApiFactory';
import { buildUrl } from './helpers';
import { ActionTypes } from './index';

import * as ActionCreators from './actionCreators';

// WORKERS

export function* initSearchWorker({ payload: searchInformations }) {
  const url = buildUrl(searchInformations);
  const pollingUrl = buildUrl({ ...searchInformations, pollingUrl: true });

  let result = yield call(Api, url, {
    method: 'GET',
  });

  let isComplete = get('complete', result);
  let index = getOr(0, 'departures.length', result);

  yield put(ActionCreators.onSearchStarted(searchInformations));
  yield put(ActionCreators.dispatchResult(result));

  while (!isComplete) {
    yield call(delay, 3000);
    result = yield call(Api, `${pollingUrl}&index=${index}`, {
      method: 'GET',
    });
    isComplete = get('complete', result);
    index += getOr(0, 'departures.length', result);
    yield put(ActionCreators.dispatchPartialResult(result));
  }

  yield put(ActionCreators.onSearchSucceed());
}

// WATCHERS

function* initSearchWatcher() {
  yield takeLatest(ActionTypes.PERFORM_SEARCH.BASE, initSearchWorker);
}

// DEFAULT
export default function* searchSaga() {
  yield all([initSearchWatcher()]);
}
