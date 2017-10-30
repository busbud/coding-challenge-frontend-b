import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toArray';
import { Observable } from 'rxjs/Observable';
import fetchTripsEpic from './fetchTripsEpic';
import {
  FETCH_TRIPS,
  FETCH_TRIPS_ERROR,
  FETCH_TRIPS_SUCCESS
} from '../actions/index';
import createApiResponse from '../fixtures/createApiResponse';

it('produces trips from API response', done => {
  const apiResponse = createApiResponse();
  apiResponse.complete = true;
  const ajax = jest.fn(() => Observable.of({ response: apiResponse }));
  const store = null;
  const action$ = ActionsObservable.of({ type: FETCH_TRIPS });

  fetchTripsEpic(action$, store, { ajax })
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([{ type: FETCH_TRIPS_SUCCESS, apiResponse }]);
      done();
    });
});

it('raises an error if something went wrong with the API', done => {
  const ajax = jest.fn(() => Observable.throw());
  const store = null;
  const action$ = ActionsObservable.of({ type: FETCH_TRIPS });

  fetchTripsEpic(action$, store, { ajax })
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([{ type: FETCH_TRIPS_ERROR }]);
      done();
    });
});
