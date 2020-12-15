/**
 * Tests for App sagas
 */

import { delay, put, takeLatest } from 'redux-saga/effects';

import { LOAD_DEPARTURES, MONTREAL, QUEBEC } from 'containers/App/constants';
import {
  loadDepartures,
  departuresLoaded,
  departureLoadingError,
} from 'containers/App/store/actions';

import busbudData, { getDepartures } from '../saga';

const searchParams = {
  origin: QUEBEC,
  destination: MONTREAL,
  outboundDate: '2020-12-14T14:21:30.490Z',
  adult: 1,
};

/* eslint-disable redux-saga/yield-effects */
describe('getDepartures Saga', () => {
  let getDeparturesGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    window.Headers = jest.fn();

    getDeparturesGenerator = getDepartures(loadDepartures());

    const selectDescriptor = getDeparturesGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getDeparturesGenerator.next(searchParams).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the departuresLoaded action if it requests the data successfully and complete is true', () => {
    const response = {
      complete: true,
      locations: [
        {
          id: 1,
          name: QUEBEC,
        },
        {
          id: 2,
          name: MONTREAL,
        },
      ],
      departures: [
        {
          departure_time: '2020-12-13 09:10:00',
          arrival_time: '2020-12-13 14:00:00',
          origin_location_id: 1,
          prices: {
            total: 5520,
          },
        },
        {
          departure_time: '2020-12-13 09:10:00',
          arrival_time: '2020-12-13 14:00:00',
          origin_location_id: 2,
          prices: {
            total: 4920,
          },
        },
      ],
    };

    const departures = response.departures.map(departure => ({
      departure_time: departure.departure_time,
      arrival_time: departure.arrival_time,
      price: departure.prices.total,
      location: response.locations.find(
        location => location.id === departure.origin_location_id,
      ),
    }));

    const putDescriptor = getDeparturesGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(departuresLoaded(departures)));
  });

  it('should dispatch the departuresLoaded action if it requests the data successfully and completed is false', () => {
    const response = {
      complete: false,
      locations: [],
      departures: [],
      prices: {},
    };

    const delayDescriptor = getDeparturesGenerator.next(response).value;
    expect(delayDescriptor).toEqual(delay(2 * 1000));

    const putDescriptor = getDeparturesGenerator.next().value;
    expect(putDescriptor).toEqual(put(loadDepartures(true)));

    const returnDescriptor = getDeparturesGenerator.next().value;
    expect(returnDescriptor).toEqual(undefined);
  });

  it('should call the departureLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getDeparturesGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(departureLoadingError(response)));
  });
});

describe('busbudDataSaga Saga', () => {
  const busbudDataSaga = busbudData();

  it('should start task to watch for LOAD_DEPARTURES action', () => {
    const takeLatestDescriptor = busbudDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_DEPARTURES, getDepartures),
    );
  });
});
