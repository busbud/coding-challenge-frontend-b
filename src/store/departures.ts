/* eslint-disable camelcase */
import { createSelector } from 'reselect';
import { merge } from 'lodash';
import { LoadDataParams } from '../helpers/api';
import { AppState } from '.';

// Constants
export const GET_DEPARTURES = 'GET_DEPARTURES';
export const GET_DEPARTURES_SUCCEEDED = 'GET_DEPARTURES_SUCCEEDED';
export const GET_DEPARTURES_FAILED = 'GET_DEPARTURES_FAILED';

// Typings, FYI I only partially typed what I needed.
export interface GetDeparturesAction {
  type: typeof GET_DEPARTURES;
  payload: LoadDataParams;
}

export interface GetDeparturesActionSucceeded {
  type: typeof GET_DEPARTURES_SUCCEEDED;
  payload: any;
}

export interface GetDeparturesActionFailed {
  type: typeof GET_DEPARTURES_FAILED;
  payload: string;
}

interface Location {
  id: number;
}

interface City {
  full_name: string;
  geohash: string;
  hero_image_url: string;
  id: string;
  image_url: string;
  locale: string;
  name: string;
  timezone: string;
}

export interface DepartureInformation {
  originCity: City;
  destinationCity: City;
  complete: boolean;
  isFetching: boolean;
}

export interface Departure {
  id: string;
  busbud_departure_id: string;
  prices: {
    total: number;
    currency: string;
  };
  departure_time: string;
  arrival_time: string;
  duration: number;
  origin_location_id: number;
  destination_location_id: number;
  operator_id: string;
}

export interface AugmentedDeparture extends Departure {
  originLocationName: string;
  destinationLocationName: string;
}

interface InitialTodoState {
  data: Departure[];
  isFetching: boolean;
}

// Actions
type DeparturesActionTypes =
  | GetDeparturesAction
  | GetDeparturesActionSucceeded
  | GetDeparturesActionFailed;

export function getDepartures(params: LoadDataParams): GetDeparturesAction {
  return {
    type: GET_DEPARTURES,
    payload: params
  };
}

export function getDeparturesSuccess(
  payload: any
): GetDeparturesActionSucceeded {
  return {
    type: GET_DEPARTURES_SUCCEEDED,
    payload
  };
}

export function getDeparturesError(payload: string): GetDeparturesActionFailed {
  return {
    type: GET_DEPARTURES_FAILED,
    payload
  };
}

// Initial state
const initialState: InitialTodoState = {
  data: [],
  isFetching: false
};

// Reducers
export function departuresReducer(
  state = initialState,
  action: DeparturesActionTypes
) {
  switch (action.type) {
    case GET_DEPARTURES:
      return {
        ...state,
        isFetching: true
      };
    case GET_DEPARTURES_SUCCEEDED:
      return {
        ...state,
        isFetching: false,
        data: {
          ...merge(state.data, action.payload) // This data would normally be normalized
        }
      };
    case GET_DEPARTURES_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
}

// Selectors
const getDeparturesSelector = (state: AppState) => {
  const { departures, locations } = state.departures.data;
  if (!departures) return [];
  return departures.map(
    (departure: Departure): AugmentedDeparture => {
      const origin = locations.find(
        (location: Location) => location.id === departure.origin_location_id
      );
      const destination = locations.find(
        (location: Location) =>
          location.id === departure.destination_location_id
      );
      return {
        ...departure,
        originLocationName: origin ? origin.name : '',
        destinationLocationName: destination ? destination.name : ''
      };
    }
  );
};

const getOriginCitySelector = (state: AppState) => {
  const { origin_city_id: originCityId, cities } = state.departures.data;
  return cities.find((c: any) => c.id === originCityId);
};

const getDestinationCitySelector = (state: AppState) => {
  const { destination_city_id: originCityId, cities } = state.departures.data;
  return cities.find((c: any) => c.id === originCityId);
};

const getIsCompleteSelector = (state: AppState) =>
  state.departures.data.complete;

const getIsFetchingSelector = (state: AppState) => state.departures.isFetching;

export const departuresSelector = createSelector(
  getDeparturesSelector,
  departures => departures
);

export const departuresInfoSelector = createSelector(
  getOriginCitySelector,
  getDestinationCitySelector,
  getIsCompleteSelector,
  getIsFetchingSelector,
  (originCity, destinationCity, complete, isFetching) => ({
    originCity,
    destinationCity,
    complete,
    isFetching
  })
);
