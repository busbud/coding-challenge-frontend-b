import { setFetching, unsetFetching } from './fetchingAction';
import {
  GET_DEPARTURES_SUCCESS,
  GET_DEPARTURES_FAILURE,
} from './actionTypes'

// http
import http from '../utils/http';

export const getDeparturesSuccess = (data) => (
  {
    type: GET_DEPARTURES_SUCCESS,
    data
  }
);

export const getDepartureFailure = (error) => (
  {
    type: GET_DEPARTURES_FAILURE,
    error,
  }
);

const timeouPromise = (pr) => {
  const seconds = Math.floor(Math.random() * 4) + 2

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      pr().then(resolve).catch(reject)
    }, seconds * 1000)
  })
}

export const getDepartures = (origin, destination, outbound_date) => (dispatch) => {
  dispatch(setFetching());
  let departures = []
  const recursiveCalls = (path = '', parmeters = {}, index = undefined) => {
    if (index !== undefined) {
      parmeters = {
        ...parmeters,
        index: `${index}/poll`
      }
    }
    return timeouPromise(() => http({
      method: 'GET',
      url: path,
      params: parmeters
    }))
      .then(response => {
        departures = [...departures, ...response.data.departures]
        if (!response.data.complete) {
          return recursiveCalls(path, parmeters, departures.length)
        }
        response.data.departures = departures
        return response;
      })
  }
  const param = {
    adult: 1,
    child: 0,
    senior: 0,
    lang: 'en',
    currency: 'USD'
  }
  return recursiveCalls(`/x-departures/${origin}/${destination}/${outbound_date}`, param)
    .then((response) => {
      console.log(response.data)
      dispatch(getDeparturesSuccess(response.data));
      dispatch(unsetFetching());
    }).catch((error) => {
      console.log(error)
      dispatch(getDepartureFailure(error));
      dispatch(unsetFetching());
    })
}
