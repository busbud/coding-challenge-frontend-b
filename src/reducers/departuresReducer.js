import initialState from './initialState'
import * as types from '../actions/actionsTypes'

export default function departuresReducer(state = initialState.departures, action) {
  switch (action.type) {
    case types.POPULATE_DEPARTURES_SUCCESS:
      return action.departures
    default:
      return state
  }
}
