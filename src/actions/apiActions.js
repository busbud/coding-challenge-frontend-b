import {
  API,
  API_START,
  API_END,
  SET_DEPARTURES_LOCATIONS,
  GET_DEPARTURES_LOCATIONS,
  UPDATE_DEPARTURES
} from '../constants/actionTypes';

export const apiStart = payload => ({
  type: API_START,
  payload
});

export const apiEnd = payload => ({
  type: API_END,
  payload
});

export const updateDepartures = payload => {
  return {
    type: UPDATE_DEPARTURES,
    payload
  };
};

const setDeparturesAndLocations = payload => {
  return {
    type: SET_DEPARTURES_LOCATIONS,
    payload
  };
};

const failureHandler = error => {
  //TODO: error handling
  console.log(error);
  return {
    type: ''
  };
};

export const getDeparturesAndLocations = () => {
  return {
    type: API,
    payload: {
      label: GET_DEPARTURES_LOCATIONS,
      onSuccess: setDeparturesAndLocations,
      onFailure: failureHandler
    }
  };
};
