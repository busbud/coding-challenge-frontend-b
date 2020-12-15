/*
 * App Actions
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  CHANGE_SEARCH_PARAMS,
  LOAD_DEPARTURES,
  LOAD_DEPARTURES_SUCCESS,
  LOAD_DEPARTURES_ERROR,
} from '../constants';

/**
 * Changes the search parameters
 *
 * @param  {object} searchParams The new search parameters
 *
 * @return {object} An action object with a type of CHANGE_SEARCH_PARAMS
 */
export function changeSearchParams(searchParams) {
  return {
    type: CHANGE_SEARCH_PARAMS,
    searchParams,
  };
}

/**
 * Load the departures, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_DEPARTURES
 */
export function loadDepartures(poll = false) {
  return {
    type: LOAD_DEPARTURES,
    poll,
  };
}

/**
 * Dispatched when the departures are loaded by the request saga
 *
 * @param  {array} departures The departure data
 *
 * @return {object}      An action object with a type of LOAD_DEPARTURES_SUCCESS passing the departures
 */
export function departuresLoaded(departures) {
  return {
    type: LOAD_DEPARTURES_SUCCESS,
    departures,
  };
}

/**
 * Dispatched when loading the departures fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_DEPARTURES_ERROR passing the error
 */
export function departureLoadingError(error) {
  return {
    type: LOAD_DEPARTURES_ERROR,
    error,
  };
}
