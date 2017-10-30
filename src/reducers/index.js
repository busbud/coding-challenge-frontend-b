import { combineReducers } from 'redux';
import {
  FETCH_TRIPS,
  FETCH_TRIPS_ERROR,
  FETCH_TRIPS_SUCCESS
} from '../actions/index';

const shouldDisplayOnboarding = (state = true, action) => {
  switch (action.type) {
    case FETCH_TRIPS:
      return false;

    default:
      return state;
  }
};

const trips = (
  state = { isFetching: false, hasError: false, apiResponse: {} },
  action
) => {
  switch (action.type) {
    case FETCH_TRIPS:
      return Object.assign({}, state, { isFetching: true, hasError: false });

    case FETCH_TRIPS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        hasError: false,
        apiResponse: action.apiResponse
      });

    case FETCH_TRIPS_ERROR:
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
