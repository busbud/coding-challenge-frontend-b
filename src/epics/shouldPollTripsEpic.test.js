import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toArray';
import shouldPollTripsEpic from './shouldPollTripsEpic';
import {
  FETCH_TRIPS_SUCCESS,
  POLL_TRIPS,
  POLL_TRIPS_SUCCESS
} from '../actions/index';
import createDeparture from '../fixtures/createDeparture';

it('polls more trips from API if fetched trips are not complete', done => {
  const action$ = ActionsObservable.of({
    type: FETCH_TRIPS_SUCCESS,
    apiResponse: createUncompleteApiResponse()
  });
  const store = {
    getState: jest.fn().mockReturnValue(createTripsWithDepartures(0))
  };

  shouldPollTripsEpic(action$, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([
        expect.objectContaining({ type: POLL_TRIPS, index: 0 })
      ]);
      done();
    });
});

it('stop polling more trips from API if fetched trips are complete', done => {
  const action$ = ActionsObservable.from([
    { type: FETCH_TRIPS_SUCCESS, apiResponse: createUncompleteApiResponse() },
    { type: POLL_TRIPS_SUCCESS, apiResponse: createUncompleteApiResponse() },
    { type: POLL_TRIPS_SUCCESS, apiResponse: createUncompleteApiResponse() },
    { type: POLL_TRIPS_SUCCESS, apiResponse: createCompleteApiResponse() }
  ]);
  const store = {
    getState: jest
      .fn()
      .mockReturnValueOnce(createTripsWithDepartures(0))
      .mockReturnValueOnce(createTripsWithDepartures(2))
      .mockReturnValue(createTripsWithDepartures(10))
  };

  shouldPollTripsEpic(action$, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([
        expect.objectContaining({ type: POLL_TRIPS, index: 0 }),
        expect.objectContaining({ type: POLL_TRIPS, index: 2 }),
        expect.objectContaining({ type: POLL_TRIPS, index: 10 })
      ]);
      done();
    });
});

function createCompleteApiResponse() {
  return { complete: true };
}

function createUncompleteApiResponse() {
  return { complete: false };
}

function createTripsWithDepartures(numberOfDepartures) {
  return {
    trips: {
      apiResponse: {
        departures: [...new Array(numberOfDepartures)].map(createDeparture)
      }
    }
  };
}
