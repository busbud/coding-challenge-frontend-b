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

export const getDeparturesAndLocations = ({
  departureDate,
  originCity,
  destinationCity,
  ...params
}) => {
  const url = `${originCity.geohash}/${destinationCity.geohash}/${departureDate}`;

  return {
    type: API,
    payload: {
      url,
      params,
      label: GET_DEPARTURES_LOCATIONS,
      onSuccess: setDeparturesAndLocations,
      onFailure: failureHandler
    }
  };
};

export const startPolling = ({ url, params, index }) => {
  return {
    type: API,
    payload: {
      url: url.indexOf('/poll') < 0 ? `${url}/poll` : url,
      delay: 2000,
      params: {
        ...params,
        index
      },
      label: POLL_START,
      onSuccess: updateDepartures,
      onFailure: failureHandler
    }
  };
};
