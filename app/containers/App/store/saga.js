/**
 * Gets all departures for a given origin city and a given destination city for a given day
 */

import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import {
  API_KEY,
  LOAD_DEPARTURES,
  CityToGeoHashMapping,
} from 'containers/App/constants';
import {
  loadDepartures,
  departuresLoaded,
  departureLoadingError,
} from 'containers/App/store/actions';

import request from 'utils/request';
import { makeSelectSearchParams } from './selectors';

/**
 * Busbud search departures request/response handler
 */
export function* getDepartures(action) {
  const headers = new Headers({
    Accept:
      'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': API_KEY,
  });

  const options = {
    method: 'GET',
    headers,
    mode: 'cors',
    cache: 'default',
  };

  // Select search params from store
  const searchParams = yield select(makeSelectSearchParams());

  const origin = CityToGeoHashMapping[searchParams.origin];
  const destination = CityToGeoHashMapping[searchParams.destination];
  const date = new Date(searchParams.outboundDate).toISOString().split('T')[0];
  const { adult } = searchParams;

  let requestURL = `https://napi.busbud.com/x-departures/${origin}/${destination}/${date}?adult=${adult}`;
  if (action && action.poll) {
    requestURL = `https://napi.busbud.com/x-departures/${origin}/${destination}/${date}/poll?adult=${adult}`;
  }

  try {
    const result = yield call(request, requestURL, options);

    if (!result.complete) {
      // sleep 2 seconds
      yield delay(2 * 1000);
      yield put(loadDepartures(true));
      return;
    }

    const departures = result.departures.map(departure => ({
      departure_time: departure.departure_time,
      arrival_time: departure.arrival_time,
      price: departure.prices.total,
      location: result.locations.find(
        location => location.id === departure.origin_location_id,
      ),
    }));

    yield put(departuresLoaded(departures));
  } catch (err) {
    yield put(departureLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* busbudData() {
  // Watches for LOAD_DEPARTURES actions and calls getDepartures when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_DEPARTURES, getDepartures);
}
