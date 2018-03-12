import { omit } from 'ramda';
import {
  selectGlobal,
  makeSelectFetchingState,
  makeSelectError,
  makeSelectQuery,
  makeSelectOutboundDate,
  makeSelectXDepartures,
  makeSelectCities,
  makeSelectDepartures,
  makeSelectOperators,
  makeSelectLocations,
  makeSelectComplete,
  makeSelectStructuredDepartures,
} from '../selectors';
import xDepartures from '../../../fixtures/xDepartures';

describe('containers | App | selectors', () => {
  let state;

  beforeEach(() => {
    state = {
      global: {
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
        xDepartures: xDepartures,
      },
    };
  });

  describe('selectGlobal', () => {
    it('should select global node state', () => {
      // given
      const selector = selectGlobal();

      // when
      const result = selector(state);

      // then
      const expected = {
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
        xDepartures: xDepartures,
      };
      expect(result).toMatchObject(expected);
    });
  });

  describe('makeSelectFetchingState', () => {
    it('should select the fetching state', () => {
      // given
      const selector = makeSelectFetchingState();

      // when
      const result = selector(state);

      // then
      const expected = false;
      expect(result).toBe(expected);
    });
  });

  describe('makeSelectError', () => {
    it('should select the error state', () => {
      // given
      const selector = makeSelectError();

      // when
      const result = selector(state);

      // then
      const expected = false;
      expect(result).toBe(expected);
    });
  });

  describe('makeSelectQuery', () => {
    it('should select the query state', () => {
      // given
      const selector = makeSelectQuery();

      // when
      const result = selector(state);

      // then
      const expected = {
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
      };
      expect(result).toMatchObject(expected);
    });
  });

  describe('makeSelectXDepartures', () => {
    it('should select xDepartures', () => {
      // given
      const selector = makeSelectXDepartures();

      // when
      const result = selector(state);

      // then
      const expected = xDepartures;
      expect(result).toMatchObject(expected);
    });

    it('should return an empty object if not found', () => {
      // given
      const selector = makeSelectXDepartures();
      const partialState = omit(['global', 'xDepartures'], state);

      // when
      const result = selector(partialState);

      // then
      const expected = {};
      expect(result).toMatchObject(expected);
    });
  });

  describe('makeSelectCities', () => {
    it('should select xDepartures cities', () => {
      // given
      const selector = makeSelectCities();

      // when
      const result = selector(state);

      // then
      const expected = state.global.xDepartures.cities;
      expect(result).toBe(expected);
    });

    it('should return an empty array if not found', () => {
      // given
      const selector = makeSelectCities();
      const partialState = omit(['global', 'xDepartures', 'cities'], state);

      // when
      const result = selector(partialState);

      // then
      const expected = [];
      expect(result).toMatchObject(expected);
    });
  });

  describe('makeSelectDepartures', () => {
    it('should select xDepartures departures', () => {
      // given
      const selector = makeSelectDepartures();

      // when
      const result = selector(state);

      // then
      const expected = state.global.xDepartures.departures;
      expect(result).toBe(expected);
    });

    it('should return an empty array if not found', () => {
      // given
      const selector = makeSelectDepartures();
      const partialState = omit(['global', 'xDepartures', 'departures'], state);

      // when
      const result = selector(partialState);

      // then
      const expected = [];
      expect(result).toMatchObject(expected);
    });
  });

  describe('makeSelectOutboundDate', () => {
    it('should return a default date if not found', () => {
      // given
      const selector = makeSelectOutboundDate();

      // when
      const partialState = omit(['global', 'query', 'path', 'outbound_date'], state);
      const result = selector(partialState);

      // then
      expect(result instanceof Date).toBe(true);
    });
  });

  describe('makeSelectOperators', () => {
    it('should select xDepartures operators', () => {
      // given
      const selector = makeSelectOperators();

      // when
      const result = selector(state);

      // then
      const expected = state.global.xDepartures.operators;
      expect(result).toBe(expected);
    });

    it('should return an empty array if not found', () => {
      // given
      const selector = makeSelectOperators();
      const partialState = omit(['global', 'xDepartures', 'operators'], state);

      // when
      const result = selector(partialState);

      // then
      const expected = [];
      expect(result).toMatchObject(expected);
    });
  });

  describe('makeSelectLocations', () => {
    it('should select xDepartures locations', () => {
      // given
      const selector = makeSelectLocations();

      // when
      const result = selector(state);

      // then
      const expected = state.global.xDepartures.locations;
      expect(result).toBe(expected);
    });

    it('should return an empty array if not found', () => {
      // given
      const selector = makeSelectLocations();
      const partialState = omit(['global', 'xDepartures', 'locations'], state);

      // when
      const result = selector(partialState);

      // then
      const expected = [];
      expect(result).toMatchObject(expected);
    });
  });

  describe('makeSelectComplete', () => {
    it('should select xDepartures complete state', () => {
      // given
      const selector = makeSelectComplete();
      state.global.xDepartures.complete = true;

      // when
      const result = selector(state);

      // then
      const expected = true;
      expect(result).toBe(expected);
    });

    it('should return false if not found', () => {
      // given
      const selector = makeSelectComplete();
      const partialState = omit(['global', 'xDepartures', 'complete'], state);

      // when
      const result = selector(partialState);

      // then
      const expected = false;
      expect(result).toBe(expected);
    });
  });
  describe('makeSelectStructuredDepartures', () => {
    it('should select xDepartures complete state', () => {
      const customState = {
        global: {
          xDepartures: {
            locations: [
              {
                id: 1,
                name: 'New York City',
              },
              {
                id: 2,
                name: 'Montréal',
              },
            ],
            operators: [
              {
                id: '0e753dbf-a9de-4339-8a00-bbb6f4813d18',
                name: 'Adirondack Trailways',
              },
            ],
            departures: [
              {
                id: 'M2U2M2ZmMTA6OWJhNmQyYjA',
                operator_id: '0e753dbf-a9de-4339-8a00-bbb6f4813d18',
                origin_location_id: 1,
                destination_location_id: 2,
              },
            ],
          },
        },
      };
      // given
      const selector = makeSelectStructuredDepartures(customState);

      // when
      const result = selector(customState);

      // then
      const expectedResult = [
        {
          id: 'M2U2M2ZmMTA6OWJhNmQyYjA',
          operator_id: '0e753dbf-a9de-4339-8a00-bbb6f4813d18',
          origin_location_id: 1,
          destination_location_id: 2,
          origin_location: {
            id: 1,
            name: 'New York City',
          },
          destination_location: {
            id: 2,
            name: 'Montréal',
          },
          operator: {
            id: '0e753dbf-a9de-4339-8a00-bbb6f4813d18',
            name: 'Adirondack Trailways',
          },
        },
      ];
      expect(result).toMatchObject(expectedResult);
    });
  });
});
