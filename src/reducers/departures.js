import {
  SET_DEPARTURES_LOCATIONS,
  UPDATE_DEPARTURES
} from '../constants/actionTypes';

export const departures = (state = [], action) => {
  switch (action.type) {
    case SET_DEPARTURES_LOCATIONS:
      return action.payload.departures;
    case UPDATE_DEPARTURES:
      return [...state, ...action.payload.departures];
    default:
      return state;
  }
};
