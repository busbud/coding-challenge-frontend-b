import {
  UPDATE_QUERY,
  FETCH_DEPARTURES,
  FETCH_DEPARTURES_SUCCESS,
  FETCH_DEPARTURES_ERROR,
  FETCH_DEPARTURES_COMPLETE,
} from '../constants';
import {
  updateQuery,
  fetchDepartures,
  fetchDeparturesSuccess,
  fetchDeparturesError,
  fetchDeparturesComplete,
} from '../actions';

describe('containers | App | actions', () => {
  describe('updateQuery', () => {
    it('should return correct action', () => {
      // given
      const query = {
        fakeKey: 'fakeValue',
      };

      // when
      const action = updateQuery(query);
      const expected = {
        type: UPDATE_QUERY,
        query,
      };

      // then
      expect(action).toMatchObject(expected);
    });
  });

  describe('fetchDepartures', () => {
    it('should return correct action', () => {
      // when
      const action = fetchDepartures();
      const expected = {
        type: FETCH_DEPARTURES,
      };

      // then
      expect(action).toMatchObject(expected);
    });
  });

  describe('fetchDeparturesSuccess', () => {
    it('should return correct action', () => {
      // given
      const xDepartures = {
        fakeKey: 'fakeValue',
      };

      // when
      const action = fetchDeparturesSuccess(xDepartures);
      const expected = {
        type: FETCH_DEPARTURES_SUCCESS,
        xDepartures,
      };

      // then
      expect(action).toMatchObject(expected);
    });
  });

  describe('fetchDeparturesError', () => {
    it('should return correct action', () => {
      // when
      const action = fetchDeparturesError();
      const expected = {
        type: FETCH_DEPARTURES_ERROR,
      };

      // then
      expect(action).toMatchObject(expected);
    });
  });

  describe('fetchDeparturesComplete', () => {
    it('should return correct action', () => {
      // when
      const action = fetchDeparturesComplete();
      const expected = {
        type: FETCH_DEPARTURES_COMPLETE,
      };

      // then
      expect(action).toMatchObject(expected);
    });
  });
});
