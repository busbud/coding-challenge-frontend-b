import { combineEpics, createEpicMiddleware } from 'redux-observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import * as Observable from 'rxjs/observable/of';
import { ajax } from 'rxjs/observable/dom/ajax';
import {
  FETCH_TRIPS,
  fetchTripsError,
  fetchTripsSuccess
} from '../../actions/index';

const busbudApiToken = process.env.REACT_APP_BUSBUD_API_TOKEN;

const fetchTripsEpic = action$ =>
  action$.ofType(FETCH_TRIPS).mergeMap(action => {
    const { origin, destination, outboundDate } = action;

    return ajax({
      url: `https://napi.busbud.com/x-departures/${origin}/${destination}/${outboundDate}`,
      headers: {
        Accept:
          'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
        'X-Busbud-Token': busbudApiToken
      },
      responseType: 'json'
    })
      .map(({ response }) => fetchTripsSuccess(response))
      .catch(() => Observable.of(fetchTripsError()));
  });

export const tripsToOsheagaEpic = combineEpics(fetchTripsEpic);

export const epicMiddleware = createEpicMiddleware(tripsToOsheagaEpic);
