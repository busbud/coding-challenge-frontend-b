import * as types from './actionsTypes'

export function loadDeparturesSuccess(departures){
  console.log('loadDeparturesSuccess')
  return { type: types.LOAD_DEPARTURES_SUCCESS, departures }
}

export function loadDepartures(departures){
  console.log('loadDepartures')
  return function(dispatch){
    dispatch(loadDeparturesSuccess(departures))
  }
}
