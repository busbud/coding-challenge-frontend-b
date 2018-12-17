import { mapSearchResultToTravelInformations } from '../helpers';
import reducer, { initialState } from '../reducer';
import * as ActionTypes from '../actionTypes';
import { searchInfos, apiResult, travelInformations } from '../fixtures';

describe('search domain reducer', () => {
  it('should set isLoading status to true when search has started', () => {
    const action = {
      type: ActionTypes.PERFORM_SEARCH.STARTED,
      payload: searchInfos,
    };

    const { adultCount, childCount, seniorCount } = searchInfos;

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
      searchInformations: {
        ...searchInfos,
        travellerCount: adultCount + childCount + seniorCount,
      },
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

  it('should store the current travel informations', () => {
    const action = {
      type: ActionTypes.DISPATCH_RESULT,
      payload: apiResult,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      travelInformations: mapSearchResultToTravelInformations(apiResult),
    });
  });

  it('should store the formatted search result', () => {
    const state = {
      ...initialState,
      travelInformations,
    };
    const action = {
      type: ActionTypes.DISPATCH_RESULT,
      payload: apiResult,
    };

    expect(reducer(state, action)).toEqual({
      ...initialState,
      searchResult: {},
    });
  });
});
