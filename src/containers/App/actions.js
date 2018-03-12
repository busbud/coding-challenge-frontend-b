import {
  UPDATE_QUERY,
  FETCH_DEPARTURES,
  FETCH_DEPARTURES_SUCCESS,
  FETCH_DEPARTURES_ERROR,
  FETCH_DEPARTURES_COMPLETE,
} from './constants';

export function updateQuery(query) {
  return {
    type: UPDATE_QUERY,
    query,
  };
}

export function fetchDepartures() {
  return {
    type: FETCH_DEPARTURES,
  };
}

export function fetchDeparturesSuccess(xDepartures) {
  return {
    type: FETCH_DEPARTURES_SUCCESS,
    xDepartures,
  };
}

export function fetchDeparturesError() {
  return {
    type: FETCH_DEPARTURES_ERROR,
  };
}

export function fetchDeparturesComplete() {
  return {
    type: FETCH_DEPARTURES_COMPLETE,
  };
}
