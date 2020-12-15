import {
  CHANGE_SEARCH_PARAMS,
  LOAD_DEPARTURES,
  LOAD_DEPARTURES_SUCCESS,
  LOAD_DEPARTURES_ERROR,
} from '../../constants';

import {
  changeSearchParams,
  loadDepartures,
  departuresLoaded,
  departureLoadingError,
} from '../actions';

describe('App Actions', () => {
  describe('changeSearchParams', () => {
    it('should return the correct type', () => {
      const searchParams = {
        origin: 'quebec',
        destination: 'montreal',
        outboundDate: '2020-12-13',
        adult: 1,
      };

      const expectedResult = {
        type: CHANGE_SEARCH_PARAMS,
        searchParams,
      };

      expect(changeSearchParams(searchParams)).toEqual(expectedResult);
    });
  });

  describe('loadDepartures', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_DEPARTURES,
        poll: false,
      };

      expect(loadDepartures()).toEqual(expectedResult);
    });
  });

  describe('departuresLoaded', () => {
    it('should return the correct type and the passed departures', () => {
      const fixture = ['Test'];

      const expectedResult = {
        type: LOAD_DEPARTURES_SUCCESS,
        departures: fixture,
      };

      expect(departuresLoaded(fixture)).toEqual(expectedResult);
    });
  });

  describe('departureLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_DEPARTURES_ERROR,
        error: fixture,
      };

      expect(departureLoadingError(fixture)).toEqual(expectedResult);
    });
  });
});
