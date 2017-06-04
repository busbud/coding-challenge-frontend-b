import fetch from 'isomorphic-fetch';
import _ from 'lodash';

const apiUrl = 'https://napi.busbud.com';

export const REQUEST_SCHEDULE = 'REQUEST_SCHEDULE';
const requestSchedule = () => {
  return {
    type: REQUEST_SCHEDULE,
  };
};

export const RECEIVE_SCHEDULE = 'RECEIVE_SCHEDULE';
const receiveSchedule = departures => {
  return {
    type: RECEIVE_SCHEDULE,
    departures
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
        const departures = json.departures;
        _.forEach(departures, departure => {
          departure.operator = _.find(json.operators, operator =>
            operator.id === departure.operator_id
          );
          departure.origLocation = _.find(json.locations, location =>
            location.id === departure.origin_location_id
          );
          departure.origCity = _.find(json.cities, city =>
            city.id === departure.origLocation.city_id
          );
          departure.destLocation = _.find(json.locations, location =>
            location.id === departure.destination_location_id
          );
          departure.destCity = _.find(json.cities, city =>
            city.id === departure.destLocation.city_id
          );
        });
        dispatch(receiveSchedule(departures));
      } else {
        dispatch(fetchSchedule());
      }
    })
    .catch(err => dispatch(failedSearch(err)));
};

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const changeLanguage = lang => {
  return {
    type: CHANGE_LANGUAGE,
    lang
  };
};
