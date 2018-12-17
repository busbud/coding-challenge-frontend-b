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

export function* initSearchWorker({ payload }) {
  const { travellers, locations, departureDate } = payload;

  const { adult: adultCount, child: childCount, senior: seniorCount } = travellers;
  const { departure, arrival } = locations;

  const urlProps = {
    adultCount,
    childCount,
    seniorCount,
    originGeohash: departure.geohash,
    arrivalGeohash: arrival.geohash,
    outboundDate: departureDate,
  };

  const url = buildUrl(urlProps);
  const pollingUrl = buildUrl({ ...urlProps, pollingUrl: true });

  let result = yield call(Api, url, {
    method: 'GET',
  });

  let isComplete = get('complete', result);
  let index = getOr(0, 'departures.length', result);

  yield put(ActionCreators.onSearchStarted());
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
