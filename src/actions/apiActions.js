import {
  API,
  API_START,
  API_END,
  SET_DEPARTURES_LOCATIONS,
  GET_DEPARTURES_LOCATIONS,
  POLL_START,
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
  console.log(error);
  return {
    type: ''
  };
};

export const getDeparturesAndLocations = () => {
  return {
    type: API,
    payload: {
      url: `dr5reg/f25dvk/2019-09-21`,
      params: {
        adult: 1,
        child: 0,
        senior: 0,
        lang: 'us',
        currency: 'usd'
      },
      label: GET_DEPARTURES_LOCATIONS,
      onSuccess: setDeparturesAndLocations,
      onFailure: failureHandler
    }
  };
};

export const startPolling = data => {
  return {
    type: API,
    payload: {
      url: `dr5reg/f25dvk/2019-09-21/poll`,
      delay: 2000,
      params: {
        adult: 1,
        child: 0,
        senior: 0,
        lang: 'us',
        currency: 'usd',
        index: data.departures.length
      },
      label: POLL_START,
      onSuccess: updateDepartures,
      onFailure: failureHandler
    }
  };
};
