import { formatDepartures } from '../utils/ApiUtil';
export const FETCH_DEPARTURES = 'FETCH_DEPARTURES';
export const GET_DEPARTURES_SUCCEEDED = 'GET_DEPARTURES_SUCCEEDED';
export const GET_DEPARTURES_FAILED = 'GET_DEPARTURES_FAILED';
export const POLL = 'POLL';

export const poll = index => ({
  type: POLL,
  index,
});

export const fetchDeparturesSuccess = response => {
  return {
    type: GET_DEPARTURES_SUCCEEDED,
    departures: formatDepartures(response.response),
    complete: response.response.complete,
  };
};

export const fetchDeparturesFail = error => {
  return {
    type: GET_DEPARTURES_FAILED,
    error: error,
  };
};

export const fetchDepartures = (index, fresh = false) => ({
  type: FETCH_DEPARTURES,
  index,
  fresh,
});
