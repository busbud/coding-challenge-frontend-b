export const DEPARTURES_DATA = {
  GET : 'DEPARTURES_DATA_GET',
  POLL : 'DEPARTURES_DATA_POLL',
  ERROR : 'DEPARTURES_DATA_ERROR',
  RECEIVED : 'DEPARTURES_DATA_RECEIVED',
  CLEAR : 'DEPARTURES_DATA'
};

export const SET_DEPARTURES_COMPLETE = 'SET_DEPARTURES_COMPLETE';

export const SET_DEPARTURES_QUERY = 'SET_DEPARTURES_QUERY';

export function setDeparturesQuery (date, type) {
  return {
    type : SET_DEPARTURES_QUERY,
    date,
    poll : type === 'poll'
  };
};

export function getDepartures (origin, destination, date, query) {
  return {
    type: DEPARTURES_DATA.GET,
    origin,
    destination,
    date,
    query
  };
}

export function gotDepartures (data = []) {
  return {
    type: DEPARTURES_DATA.RECEIVED,
    data
  };
}

export function clearDepartures () {
  return {
    type: DEPARTURES_DATA.CLEAR,
  };
}

export function setComplete (complete) {
  return {
    type : SET_DEPARTURES_COMPLETE,
    complete
  };
}
