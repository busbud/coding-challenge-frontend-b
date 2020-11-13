import * as t from './actionTypes';

export const startGettingData = () => {
  return {
    type: t.START_GETTING_DATA,
  };
};

export const setDepartures = (departures) => {
  return {
    type: t.SET_DEPARTURES,
    departures,
  };
};

export const errorFettichingData = (error) => {
  return {
    type: t.SET_FETCH_ERROR,
    error: error,
  };
};
