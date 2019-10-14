import { ajax } from 'rxjs/ajax';
import { map, switchMap, filter, delay } from 'rxjs/operators';
import {
  FETCH_DEPARTURES,
  POLL,
  fetchDeparturesSuccess,
  poll,
  fetchDepartures,
  GET_DEPARTURES_SUCCEEDED,
} from '../actions/departuresActions';

export const fetchEpic = action$ =>
  action$.ofType(FETCH_DEPARTURES).pipe(
    map(action => action.index),
    switchMap(index =>
      ajax({
        url: `https://napi.busbud.com/x-departures/dr5reg/f25dvk/2020-08-07/poll?index=${index}`,
        method: 'GET',
        headers: {
          Accept:
            'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
          'X-Busbud-Token': process.env.REACT_APP_API_KEY,
        },
      }).pipe(map(fetchDeparturesSuccess)),
    ),
  );

export const successEpic = action$ =>
  action$.ofType(GET_DEPARTURES_SUCCEEDED).pipe(
    filter(action => !action.complete),
    delay(3000),
    map(action => action.departures.length),
    map(poll),
  );

export const pollEpic = action$ =>
  action$.ofType(POLL).pipe(
    map(action => action.index),
    map(fetchDepartures),
  );
