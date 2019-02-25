import { SET_DEPARTURES_LOCATIONS } from '../constants/actionTypes';

export const isDataComplete = (state = [], action) => {
  switch (action.type) {
    case SET_DEPARTURES_LOCATIONS:
      isDataComplete: action.payload.complete;
    default:
      return state;
  }
};
