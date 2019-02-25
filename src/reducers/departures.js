import { SET_DEPARTURES_LOCATIONS } from '../constants/actionTypes';

export const departures = (state = [], action) => {
  switch (action.type) {
    case SET_DEPARTURES_LOCATIONS:
      return action.payload.departures;
    default:
      return state;
  }
};
