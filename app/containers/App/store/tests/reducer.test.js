import produce from 'immer';

import appReducer, { initialState } from '../reducer';
import {
  changeSearchParams,
  loadDepartures,
  departuresLoaded,
  departureLoadingError,
} from '../actions';
import { MONTREAL, QUEBEC } from '../../constants';

/* eslint-disable default-case, no-param-reassign */
describe('appReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      loading: false,
      error: false,
      searchParams: {
        origin: QUEBEC,
        destination: MONTREAL,
        outboundDate: '2020-12-14T14:21:30.490Z',
        adult: 1,
      },
      searchResult: {
        departures: false,
      },
    };
  });

  it('should return the initial state', () => {
    const expectedResult = initialState;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadDepartures action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.searchResult.departures = false;
    });

    expect(appReducer(state, loadDepartures())).toEqual(expectedResult);
  });

  it('should handle the changeSearchParams action correctly', () => {
    const fixture = {
      origin: 'quebec',
      destination: 'montreal',
      outboundDate: '2020-12-13',
      adult: 1,
    };

    const expectedResult = produce(state, draft => {
      draft.searchParams = fixture;
    });

    expect(appReducer(state, changeSearchParams(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the departuresLoaded action correctly', () => {
    const fixture = [
      {
        name: 'My Departure',
      },
    ];

    const expectedResult = produce(state, draft => {
      draft.searchResult.departures = fixture;
      draft.loading = false;
    });

    expect(appReducer(state, departuresLoaded(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the departureLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = produce(state, draft => {
      draft.error = fixture;
      draft.loading = false;
    });

    expect(appReducer(state, departureLoadingError(fixture))).toEqual(
      expectedResult,
    );
  });
});
