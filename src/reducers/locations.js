import { SET_DEPARTURES_LOCATIONS } from '../constants/actionTypes';

export const locations = (state = [], action) => {
  switch (action.type) {
    case SET_DEPARTURES_LOCATIONS:
      return action.payload.locations;
    default:
      return state;
  }
};
