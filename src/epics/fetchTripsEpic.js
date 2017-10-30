import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import {
  FETCH_TRIPS,
  fetchTripsError,
  fetchTripsSuccess
} from '../actions/index';

const busbudApiToken = process.env.REACT_APP_BUSBUD_API_TOKEN;

const fetchTripsEpic = (action$, store, { ajax }) => {
  return action$
    .ofType(FETCH_TRIPS)
    .mergeMap(action => fetchTrips(action, ajax));
};

export default fetchTripsEpic;

function fetchTrips(action, ajax) {
  const {
    origin,
    destination,
    outboundDate,
    numberOfAdults,
    currency,
    lang
  } = action;

  return ajax({
    url: `https://napi.busbud.com/x-departures/${origin}/${destination}/${outboundDate}`,
    headers: {
      Accept:
        'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-Token': busbudApiToken
    },
    body: {
      adult: numberOfAdults,
      lang,
      currency
    },
    responseType: 'json'
  })
    .map(({ response }) => fetchTripsSuccess(response))
    .catch(() => Observable.of(fetchTripsError()));
}
