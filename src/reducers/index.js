import { combineReducers } from 'redux';
import {
  FETCH_TRIPS,
  FETCH_TRIPS_ERROR,
  FETCH_TRIPS_SUCCESS,
  GO_TO_ONBOARDING,
  POLL_TRIPS,
  POLL_TRIPS_ERROR,
  POLL_TRIPS_SUCCESS
} from '../actions/index';

const shouldDisplayOnboarding = (state = true, action) => {
  switch (action.type) {
    case FETCH_TRIPS:
      return false;

    case GO_TO_ONBOARDING:
      return true;

    default:
      return state;
  }
};

const initialTripsState = {
  isFetching: false,
  isPolling: false,
  hasError: false,
  apiResponse: {
    departures: [],
    operators: [],
    complete: false
  }
};

const trips = (state = initialTripsState, action) => {
  switch (action.type) {
    case FETCH_TRIPS:
      return Object.assign({}, state, {
        isFetching: true,
        hasError: false
      });

    case FETCH_TRIPS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        hasError: false,
        apiResponse: action.apiResponse
      });

    case POLL_TRIPS:
      return Object.assign({}, state, {
        isPolling: true,
        hasError: false
      });

    case POLL_TRIPS_SUCCESS:
      return Object.assign({}, state, {
        isPolling: false,
        hasError: false,
        apiResponse: Object.assign({}, state.apiResponse, {
          departures: state.apiResponse.departures.concat(
            action.apiResponse.departures
          ),
          operators: state.apiResponse.operators.concat(
            action.apiResponse.operators
          ),
          complete: action.apiResponse.complete
        })
      });

    case FETCH_TRIPS_ERROR:
    case POLL_TRIPS_ERROR:
      return Object.assign({}, state, { hasError: true });

    default:
      return state;
  }
};

const tripsToOsheaga = combineReducers({
  shouldDisplayOnboarding,
  trips
});

export default tripsToOsheaga;
