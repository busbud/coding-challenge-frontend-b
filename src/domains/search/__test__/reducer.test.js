import reducer, { initialState } from '../reducer';
import * as ActionTypes from '../actionTypes';

describe('search domain reducer', () => {
  it('should set isLoading status to true when search has started', () => {
    const action = {
      type: ActionTypes.PERFORM_SEARCH.STARTED,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should set isLoading status to true when search has succeed', () => {
    const action = {
      type: ActionTypes.PERFORM_SEARCH.SUCCEEDED,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
    });
  });

  it('should store', () => {
    const action = {
      type: ActionTypes.PERFORM_SEARCH.SUCCEEDED,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
    });
  });
});
