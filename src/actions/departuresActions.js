import * as types from './actionsTypes'

export function populateDeparturesSuccess(departures){
  return { type: types.POPULATE_DEPARTURES_SUCCESS, departures }
}

export function populateDepartures(departures){
  return function(dispatch){
    dispatch(populateDeparturesSuccess(departures))
  }
}

export function reorderDeparturesSuccess(departures){
  return { type: types.REORDER_DEPARTURES_SUCCESS, departures }
}

export function reorderDepartures(departures){
  return function(dispatch){
    dispatch(reorderDeparturesSuccess(departures))
  }
}
