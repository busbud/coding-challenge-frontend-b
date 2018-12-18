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

const onPerformSearchStarted = (state: State, payload: SearchInformations) => ({
  ...state,
  searchInformations: payload,
  isLoading: true,
});

const onPerformSearchSuceeded = (state: State) => ({
  ...state,
  isLoading: false,
});

const onResultDispatched = (state: State, payload) => {
  const { searchInformations } = state;
  const enhancedPayload = { ...payload, travellersCount: searchInformations.travellersCount };
  const proposedTrips = mapApiResultToProposedTrip(enhancedPayload);

  const sortedProposedTrip: Array<ProposedTrip> = sortBy(
    item => moment(item.departureTime),
    proposedTrips,
  ).reverse();

  return {
    ...state,
    travelInformations: mapSearchResultToTravelInformations(payload),
    proposedTrips: sortedProposedTrip,
  };
};

const onDispatchPartialResult = (state: State, payload) => {
  const { proposedTrips, travelInformations, searchInformations } = state;

  const enhancedPayload = { ...payload, travellersCount: searchInformations.travellersCount };
  const newProposedTrip: Array<ProposedTrip> = mapApiResultToProposedTrip({
    ...enhancedPayload,
    locations: travelInformations.locations,
  });

  const mergedAndSortedProposedTrip: Array<ProposedTrip> = sortBy(
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
