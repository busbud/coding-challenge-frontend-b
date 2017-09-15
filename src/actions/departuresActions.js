import * as types from './actionsTypes'

export function populateDeparturesSuccess(departures){
  return { type: types.POPULATE_DEPARTURES_SUCCESS, departures }
}

export function populateDepartures(departures){
  return function(dispatch){
    dispatch(populateDeparturesSuccess(departures))
  }
}
