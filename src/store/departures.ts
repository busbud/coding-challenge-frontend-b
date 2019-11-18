/* eslint-disable camelcase */
import { createSelector } from 'reselect';
import { AppState } from '.';

// Constants
export const GET_DEPARTURES = 'GET_DEPARTURES';
export const GET_DEPARTURES_SUCCESS = 'GET_DEPARTURES_SUCCESS';
export const GET_DEPARTURES_ERROR = 'GET_DEPARTURES_ERROR';

// Typings
interface GetDeparturesAction {
  type: typeof GET_DEPARTURES;
}
interface GetDeparturesActionSuccess {
  type: typeof GET_DEPARTURES_SUCCESS;
  payload: any;
}
interface GetDeparturesActionError {
  type: typeof GET_DEPARTURES_ERROR;
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
  | GetDeparturesActionSuccess
  | GetDeparturesActionError;

export function getDepartures(): GetDeparturesAction {
  return {
    type: GET_DEPARTURES
  };
}

export function getDeparturesSuccess(payload: any): GetDeparturesActionSuccess {
  return {
    type: GET_DEPARTURES_SUCCESS,
    payload
  };
}

export function getDeparturesError(payload: string): GetDeparturesActionError {
  return {
    type: GET_DEPARTURES_ERROR,
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
    case GET_DEPARTURES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload // This data would normally be normalized
      };
    case GET_DEPARTURES_ERROR:
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
  return departures.map(
    (departure: Departure): AugmentedDeparture => {
      return {
        ...departure,
        originLocationName: locations.find(
          (location: Location) => location.id === departure.origin_location_id
        ).name,
        destinationLocationName: locations.find(
          (location: Location) =>
            location.id === departure.destination_location_id
        ).name
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

export const departuresSelector = createSelector(
  getDeparturesSelector,
  departures => departures
);

export const departuresInfoSelector = createSelector(
  getOriginCitySelector,
  getDestinationCitySelector,
  (originCity, destinationCity) => ({
    originCity,
    destinationCity
  })
);
