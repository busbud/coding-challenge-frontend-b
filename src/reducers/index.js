import {
  REQUEST_SCHEDULE,
  RECEIVE_SCHEDULE
} from '../actions';
import { combineReducers } from 'redux';

const initialState = {
  isFetching: false,
  schedule: {}
};

const search = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_SCHEDULE:
    return {
      ...state,
      isFetching: true
    };
  case RECEIVE_SCHEDULE:
    return {
      ...state,
      isFetching: false,
      schedule: action.json
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  search
});

export default rootReducer;
