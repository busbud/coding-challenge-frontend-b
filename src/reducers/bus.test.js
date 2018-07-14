import reducer, { initialState } from './bus';
import { actions } from '../actions/bus';

expect.hasAssertions();

const validRoute = {};

describe('Test bus route reducer', () => {
  describe('Unknown action', () => {
    it('should not change state', () => {
      expect.assertions(1);
      const action = { type: 'UNKNOWN_ACTION' };
      expect(reducer(initialState, action)).toEqual(initialState);
    });
  });
  describe('ROUTES_FETCH_BEGIN action', () => {
    it('should change loading state', () => {
      expect.assertions(1);
      const action = { type: actions.ROUTES_FETCH_BEGIN };
      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: true,
      });
    });
    it('should reset state - success', () => {
      expect.assertions(1);
      const routes = [validRoute, validRoute];

      let state = reducer(initialState, { type: actions.ROUTES_FETCH_BEGIN });
      state = reducer(state, { type: actions.ROUTES_FETCH_SUCCESS, routes, isComplete: false });

      expect(reducer(state, { type: actions.ROUTES_FETCH_BEGIN })).toEqual({
        ...initialState,
        isLoading: true,
      });

    });
    it('should reset state - error', () => {
      expect.assertions(1);
      const error = new Error('I am an error');

      let state = reducer(initialState, { type: actions.ROUTES_FETCH_BEGIN });
      state = reducer(state, { type: actions.ROUTES_FETCH_FAILURE, error });

      expect(reducer(state, { type: actions.ROUTES_FETCH_BEGIN })).toEqual({
        ...initialState,
        isLoading: true,
      });
    });
  });
  describe('ROUTES_FETCH_SUCCESS action', () => {
    it('should stop loading state and set list', () => {
      expect.assertions(1);
      const routes = [validRoute, validRoute];
      const isComplete = true;
      let state = reducer(initialState, { type: actions.ROUTES_FETCH_BEGIN });
      const action = { type: actions.ROUTES_FETCH_SUCCESS, routes, isComplete };
      expect(reducer(state, action)).toEqual({
        ...state,
        list: routes,
        error: null,
        isLoading: false,
        isComplete
      });
    });
    it('should stop set complete state to false', () => {
      expect.assertions(1);
      const routes = [validRoute, validRoute];
      const isComplete = false;
      let state = reducer(initialState, { type: actions.ROUTES_FETCH_BEGIN });
      const action = { type: actions.ROUTES_FETCH_SUCCESS, routes, isComplete };
      expect(reducer(state, action)).toEqual({
        ...state,
        list: routes,
        error: null,
        isLoading: false,
        isComplete
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
        isLoading: false,
        isComplete: null,
      });
    });
    it('should not clear results', () => {
      expect.assertions(1);
      const routes = [validRoute, validRoute];
      const error = new Error('I am an error');

      let state = reducer(initialState, { type: actions.ROUTES_FETCH_BEGIN });
      state = reducer(state, { type: actions.ROUTES_FETCH_SUCCESS, routes, isComplete: false });

      const action = { type: actions.ROUTES_FETCH_FAILURE, error };
      expect(reducer(state, action)).toEqual({
        ...state,
        list: routes,
        error,
        isLoading: false,
        isComplete: null
      });
    });
  });
});
