import reducer from '../reducer';
import {
  UPDATE_QUERY,
  FETCH_DEPARTURES,
  FETCH_DEPARTURES_SUCCESS,
  FETCH_DEPARTURES_ERROR,
  FETCH_DEPARTURES_COMPLETE,
} from '../constants';
import xDepartures from '../../../fixtures/xDepartures';

const initialState = {
  isFetching: false,
  hasError: false,
  query: {
    path: {
      origin: 'dr5reg',
      destination: 'f25dvk',
      outbound_date: '2018-08-02',
    },
    params: {
      adult: null,
      child: null,
      senior: null,
      lang: null,
      currency: null,
    },
  },
  xDepartures: null,
};

describe('containers | App | reducer', () => {
  it('returns the initial state', () => {
    // given
    const action = {};

    // when
    const newState = reducer(undefined, action);

    // then
    expect(newState).toEqual(initialState);
  });
  describe('UPDATE_QUERY', () => {
    it('should return state updated accordingly', () => {
      // given
      const query = {
        path: {
          origin: '7f6hfd',
          destination: 'h47jhf',
          outbound_date: '2018-05-20',
        },
        params: {
          adult: 1,
          child: 3,
        },
      };
      const action = { type: UPDATE_QUERY, query: query };

      // when
      const newState = reducer(undefined, action);

      // then
      const expectedState = {
        isFetching: false,
        hasError: false,
        query: {
          path: {
            origin: '7f6hfd',
            destination: 'h47jhf',
            outbound_date: '2018-05-20',
          },
          params: {
            adult: 1,
            child: 3,
            senior: null,
            lang: null,
            currency: null,
          },
        },
        xDepartures: null,
      };
      expect(newState).toEqual(expectedState);
    });
  });
  describe('FETCH_DEPARTURES', () => {
    it('should return state updated accordingly', () => {
      // given
      const action = { type: FETCH_DEPARTURES };
      const state = {
        ...initialState,
        isFetching: false,
        hasError: true,
      };
      // when
      const newState = reducer(state, action);

      // then
      const expectedState = {
        ...initialState,
        isFetching: true,
        hasError: false,
      };
      expect(newState).toEqual(expectedState);
    });
  });

  describe('FETCH_DEPARTURES_SUCCESS', () => {
    it('should return state updated accordingly', () => {
      // given
      const action = { type: FETCH_DEPARTURES_SUCCESS, xDepartures };
      const state = {
        ...initialState,
        hasError: true,
        xDepartures: null,
      };

      // when
      const newState = reducer(state, action);

      // then
      const expectedState = {
        ...initialState,
        hasError: false,
        xDepartures,
      };
      expect(newState).toEqual(expectedState);
    });
  });

  describe('FETCH_DEPARTURES_ERROR', () => {
    it('should return state updated accordingly', () => {
      // given
      const action = { type: FETCH_DEPARTURES_ERROR };
      const state = {
        ...initialState,
        hasError: false,
      };

      // when
      const newState = reducer(state, action);

      // then
      const expectedState = {
        ...initialState,
        hasError: true,
      };
      expect(newState).toEqual(expectedState);
    });
  });

  describe('FETCH_DEPARTURES_COMPLETE', () => {
    it('should return state updated accordingly', () => {
      // given
      const action = { type: FETCH_DEPARTURES_COMPLETE };
      const state = {
        ...initialState,
        isFetching: true,
      };

      // when
      const newState = reducer(state, action);

      // then
      const expectedState = {
        ...initialState,
        isFetching: false,
      };
      expect(newState).toEqual(expectedState);
    });
  });
});
