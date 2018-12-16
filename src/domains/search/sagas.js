import {
  all, call, takeLatest, put,
} from 'redux-saga/effects';

import { Api } from '../../helpers/ApiFactory';

import { buildUrl } from './helpers';

import { ActionTypes } from './index';

import * as ActionCreators from './actionCreators';

// WORKERS

export function* pollApi() {}

export function* initSearchWorker({ payload }) {
  const { travellers, locations, departureDate } = payload;

  const { adult: adultCount, child: childCount, senior: seniorCount } = travellers;
  const { departure, arrival } = locations;
  const url = buildUrl({
    adultCount,
    childCount,
    seniorCount,
    originGeohash: departure.geoHash,
    arrivalGeohash: arrival.geoHash,
    outboundDate: departureDate,
  });

  const result = yield call(Api, url, {
    method: 'GET',
  });

  if (result.complete) {
    yield put(ActionCreators.dispatchResult(result));
  } else {
    yield call(pollApi, {
      adultCount: adult,
      childCount: child,
      seniorCount: senior,
      departureGeo,
    });
  }
}

// WATCHERS

function* initSearchWatcher(params) {
  yield takeLatest(ActionTypes.INIT_SEARCH.BASE, initSearchWorker);
}

// DEFAULT
export default function* searchSaga() {
  yield all([initSearchWatcher()]);
}
