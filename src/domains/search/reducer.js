// @flow

import * as ActionTypes from './actionTypes';
import type { ProposedTrip, SearchFormParameters } from '../../types';

type City = {
  id: string,
  name: string,
  full_name: string,
};

type Location = {
  id: string,
  city_id: string,
  name: string,
  address: Array<string>,
};

type Operator = {
  id: string,
  logo_url: string,
  display_name: string,
};

type Departure = {
  id: string,
  origin_location_id: string,
  destination_location_id: string,
  operator_id: string,
  prices: {
    total: string,
  },
  departure_time: string,
  arrivalTime: string,
};

type TravelInformations = {|
  cities: Array<City>,
  locations: Array<Location>,
  operators: Array<Operator>,
|};

type State = {|
  isLoading: true,
  travelInformation: TravelInformations,
  searchResults: Array<PropsedTrip>,
  searchInformation: SearchFormParameters,
|};

export const initialState: State = {
  travelInformations: {},
};

const onPerformSearchStarted = state => ({
  ...state,
  isLoading: true,
});

const onPerformSearchSuceeded = state => ({
  ...state,
  isLoading: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.PERFORM_SEARCH.STARTED:
      return onPerformSearchStarted(state);

    case ActionTypes.PERFORM_SEARCH.SUCCEEDED:
      return onPerformSearchSuceeded(state);
    default:
      return state;
  }
}
