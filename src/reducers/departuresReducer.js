import initialState from './initialState'
import * as types from '../actions/actionsTypes'

export default function departuresReducer(state = initialState.departures, action) {
  console.log('in departure Reducer')
  switch (action.type) {
    case types.LOAD_DEPARTURES_SUCCESS:
      return action.departures
    default:
      return state
  }
}
