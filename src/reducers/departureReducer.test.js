import departures from './departuresReducer';
import {
  FETCH_DEPARTURES,
  GET_DEPARTURES_SUCCEEDED,
} from '../actions/departuresActions';

const singleDepartureMock = (id, operatorName) => ({
  id: id,
  operatorName: operatorName,
});

const initialState = {
  error: null,
  isFetching: false,
  list: [],
};

const freshDeparturesMock = {
  type: FETCH_DEPARTURES,
  index: 0,
  fresh: true,
};

const freshDeparturesMockState = {
  error: null,
  isFetching: true,
  list: [],
};

const appendMockInitial = {
  error: null,
  isFetching: true,
  list: [singleDepartureMock(1, 'Greyhound')],
};

const appendMockPayload = {
  type: FETCH_DEPARTURES,
  index: 0,
  fresh: false,
};

const appendMockResult = appendMockInitial;

const successInitial = {
  error: null,
  isFetching: true,
  list: [singleDepartureMock(0, 'Greyhound')],
};
const successDepartureMock = {
  type: GET_DEPARTURES_SUCCEEDED,
  complete: true,
  departures: [singleDepartureMock(1, 'Greyhound')],
};

const successMockResult = {
  error: null,
  isFetching: false,
  list: [
    singleDepartureMock(0, 'Greyhound'),
    singleDepartureMock(1, 'Greyhound'),
  ],
};

describe('Departures Reducer', () => {
  it('should return the initial state', () => {
    expect(departures(undefined, {})).toEqual(initialState);
  });
  it('Should empty list for fresh departures', () => {
    expect(
      departures(appendMockInitial, freshDeparturesMock),
    ).toEqual(freshDeparturesMockState);
  });
  it('Should mainitain state for not fresh', () => {
    expect(departures(appendMockInitial, appendMockPayload)).toEqual(
      appendMockResult,
    );
  });
  it('Should append list items after success', () => {
    expect(departures(successInitial, successDepartureMock)).toEqual(
      successMockResult,
    );
  });
});
