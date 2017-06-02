import fetch from 'isomorphic-fetch';

const apiUrl = 'https://napi.busbud.com';

export const REQUEST_SCHEDULE = 'REQUEST_SCHEDULE';
const requestSchedule = () => {
  return {
    type: REQUEST_SCHEDULE,
  };
};

export const RECEIVE_SCHEDULE = 'RECEIVE_SCHEDULE';
const receiveSchedule = json => {
  return {
    type: RECEIVE_SCHEDULE,
    schedule: json
  };
};

export const FAILED_SEARCH = 'FAILED_SEARCH';
const failedSearch = (err = {}) => {
  return {
    type: FAILED_SEARCH,
    err
  };
};

export const fetchSchedule = () => dispatch => {
  dispatch(requestSchedule());
  return fetch(`${apiUrl}/x-departures/dr5reg/f25dvk/2017-07-29?adult=1`, {
    headers: {
      'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
    }
  })
    .then(res => res.json())
    .then(json => {
      if (json.complete) {
        dispatch(receiveSchedule(json));
      } else {
        dispatch(failedSearch());
      }
    })
    .catch(err => dispatch(failedSearch(err)));
};
