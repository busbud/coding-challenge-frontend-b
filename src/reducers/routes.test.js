import reducer, { initialState } from './routes';
import { actions } from '../actions/routes';

expect.hasAssertions();

const validRoute = {
  departure: {
    date: '2018-10-01',
  },
};

describe('Test bus route reducer', () => {
  describe('Unknown action', () => {
    it('should not change state', () => {
      expect.assertions(1);
      const action = { type: 'UNKNOWN_ACTION' };
      expect(reducer(initialState, action)).toEqual(initialState);
    });
  });
  describe('ROUTES_FETCH_BEGIN action', () => {
    it('should change complete state', () => {
      expect.assertions(1);
      const action = { type: actions.ROUTES_FETCH_BEGIN };
      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        isComplete: false,
      });
    });
    it('should reset state - success', () => {
      expect.assertions(1);

      let state = reducer(initialState, { type: actions.ROUTES_FETCH_BEGIN });
      state = reducer(state, { type: actions.ROUTES_FETCH_SUCCESS });

      expect(reducer(state, { type: actions.ROUTES_FETCH_BEGIN })).toEqual({
        ...initialState,
        isComplete: false,
      });
    });
    it('should reset state - add', () => {
      expect.assertions(1);
      const routes = [validRoute, validRoute];
      let state = reducer(initialState, { type: actions.ROUTES_FETCH_BEGIN });
      state = reducer(state, { type: actions.ROUTES_FETCH_ADD, routes });
      const action = { type: actions.ROUTES_FETCH_BEGIN };
      expect(reducer(state, action)).toEqual({
        ...initialState,
        isComplete: false,
      });
    });
    it('should reset state - error', () => {
      expect.assertions(1);
      const error = new Error('I am an error');

      let state = reducer(initialState, { type: actions.ROUTES_FETCH_BEGIN });
      state = reducer(state, { type: actions.ROUTES_FETCH_FAILURE, error });

      expect(reducer(state, { type: actions.ROUTES_FETCH_BEGIN })).toEqual({
        ...initialState,
        isComplete: false,
      });
    });
  });
  describe('ROUTES_FETCH_ADD action', () => {
    it('should not be complete and set list', () => {
      expect.assertions(1);
      const routes = [validRoute, validRoute];
      let state = reducer(initialState, { type: actions.ROUTES_FETCH_BEGIN });
      const action = { type: actions.ROUTES_FETCH_ADD, routes };
      expect(reducer(state, action)).toEqual({
        ...state,
        list: routes,
        error: null,
        isComplete: false
      });
    });
  });
  describe('ROUTES_FETCH_SUCCESS action', () => {
    it('should be complete and set list', () => {
      expect.assertions(1);
      const routes = [validRoute, validRoute];
      let state = reducer(initialState, { type: actions.ROUTES_FETCH_BEGIN });
      state = reducer(state, { type: actions.ROUTES_FETCH_ADD, routes });
      const action = { type: actions.ROUTES_FETCH_SUCCESS };
      expect(reducer(state, action)).toEqual({
        ...state,
        list: routes,
        error: null,
        isComplete: true
      });
    });
  });
  describe('ROUTES_FETCH_FAILURE action', () => {
    it('should set error object', () => {
      expect.assertions(1);
      const error = new Error('I am an error');
      let state = reducer(initialState, { type: actions.ROUTES_FETCH_BEGIN });
      const action = { type: actions.ROUTES_FETCH_FAILURE, error };
      expect(reducer(state, action)).toEqual({
        ...state,
        error,
        isComplete: null,
      });
    });
    it('should not clear results', () => {
      expect.assertions(1);
      const routes = [validRoute, validRoute];
      const error = new Error('I am an error');

      let state = reducer(initialState, { type: actions.ROUTES_FETCH_BEGIN });
      state = reducer(state, { type: actions.ROUTES_FETCH_ADD, routes });

      const action = { type: actions.ROUTES_FETCH_FAILURE, error };
      expect(reducer(state, action)).toEqual({
        ...state,
        list: routes,
        error,
        isComplete: null
      });
    });
  });
});
