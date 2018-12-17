// @flow

import * as ActionTypes from './actionTypes';
import type { ProposedTrip, SearchInformations, TravelInformations } from '../../types';
import { mapSearchResultToTravelInformations } from './helpers';

type State = {|
  isLoading: boolean,
  travelInformations: TravelInformations,
  searchResults: Array<ProposedTrip>,
  searchInformations: SearchInformations,
|};

export const initialState: State = {
  travelInformations: {
    cities: [],
    locations: [],
    operators: [],
  },
  searchInformations: {
    adultCount: 0,
    childCount: 0,
    seniorCount: 0,
    originGeohash: '',
    arrivalGeohash: '',
    outboundDate: '',
  },
  searchResults: [],
  isLoading: false,
};

const onPerformSearchStarted = (state: State, payload: SearchInformations) => {
  const { adultCount, childCount, seniorCount } = payload;
  return {
    ...state,
    searchInformations: { ...payload, travellerCount: adultCount + childCount + seniorCount },
    isLoading: true,
  };
};

const onPerformSearchSuceeded = (state: State) => ({
  ...state,
  isLoading: false,
});

const onResultDispatched = (state: State, payload) => ({
  ...state,
  travelInformations: mapSearchResultToTravelInformations(payload),
});

export default function (state: State = initialState, action) {
  switch (action.type) {
    case ActionTypes.PERFORM_SEARCH.STARTED:
      return onPerformSearchStarted(state, action.payload);

    case ActionTypes.PERFORM_SEARCH.SUCCEEDED:
      return onPerformSearchSuceeded(state);

    case ActionTypes.DISPATCH_RESULT:
      return onResultDispatched(state, action.payload);
    default:
      return state;
  }
}
