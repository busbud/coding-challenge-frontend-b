import {
  REQUEST_SCHEDULE,
  RECEIVE_SCHEDULE,
  FAILED_SEARCH
} from '../actions';
import { combineReducers } from 'redux';

const initialState = {
  isFetching: false,
  departures: [],
  searchFailed: false
};

const search = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_SCHEDULE:
    return {
      ...state,
      isFetching: true,
      searchFailed: false
    };
  case RECEIVE_SCHEDULE:
    return {
      ...state,
      isFetching: false,
      departures: action.departures
    };
  case FAILED_SEARCH:
    return {
      ...state,
      isFetching: false,
      searchFailed: true
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  search
});

export default rootReducer;
