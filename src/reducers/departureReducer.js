import {
  GET_DEPARTURES_SUCCESS,
  GET_DEPARTURES_FAILURE,
} from '../actions/actionTypes';

import initialState from './initialState';

export const departures = (state = initialState.departures, action) => {
  switch (action.type) {
    case GET_DEPARTURES_SUCCESS:
      return {
        ...state,
        data: action.data,
      };

    case GET_DEPARTURES_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}
