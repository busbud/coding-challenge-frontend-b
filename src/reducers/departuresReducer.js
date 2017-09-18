import initialState from './initialState'
import * as types from '../actions/actionsTypes'

export default function departuresReducer(state = initialState.departures, action) {
  switch (action.type) {
    case types.POPULATE_DEPARTURES_SUCCESS:
      return action.departures
    case types.REORDER_DEPARTURES_SUCCESS:
      const newDeparturesObject = Object.assign({}, state, { departures: action.departures })
      return newDeparturesObject
    default:
      return state
  }
}
