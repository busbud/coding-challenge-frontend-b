// @flow

import { sortBy } from 'lodash/fp';
import moment from 'moment';
import * as ActionTypes from './actionTypes';
import type { ProposedTrip, SearchInformations, TravelInformations } from '../../types';
import { mapSearchResultToTravelInformations, mapApiResultToProposedTrip } from './helpers';

type Action = {
  type: string,
  payload: any,
};
type State = {|
  isLoading: boolean,
  travelInformations: TravelInformations,
  proposedTrips: Array<ProposedTrip>,
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
    travellersCount: 0,
  },
  proposedTrips: [],
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

const onResultDispatched = (state: State, payload) => {
  const proposedTrips = mapApiResultToProposedTrip(payload);

  const sortedProposedTrip = sortBy(item => moment(item.departureTime), proposedTrips).reverse();

  return {
    ...state,
    travelInformations: mapSearchResultToTravelInformations(payload),
    proposedTrips: sortedProposedTrip,
  };
};

const onDispatchPartialResult = (state: State, payload) => {
  const { proposedTrips } = state;
  const newProposedTrip = mapApiResultToProposedTrip({
    ...payload,
    locations: state.travelInformations.locations,
  });

  const mergedAndSortedProposedTrip = sortBy(
    item => moment(item.departureTime),
    proposedTrips.concat(newProposedTrip),
  ).reverse();

  return {
    ...state,
    proposedTrips: mergedAndSortedProposedTrip,
  };
};

export default function (state: State = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.PERFORM_SEARCH.STARTED:
      return onPerformSearchStarted(state, action.payload);

    case ActionTypes.PERFORM_SEARCH.SUCCEEDED:
      return onPerformSearchSuceeded(state);

    case ActionTypes.DISPATCH_RESULT:
      return onResultDispatched(state, action.payload);

    case ActionTypes.DISPATCH_PARTIAL_RESULT:
      return onDispatchPartialResult(state, action.payload);
    default:
      return state;
  }
}
