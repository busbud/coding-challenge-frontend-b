import {
  MY_ACTION
} from '../actions'

const departures = (state = {
  loading: false,
  data: []
}, action) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state
      }
    case INCOMPLETE:
      return {
        ...state,
        loading: true,
      }
    case COMPLETE:
      return {
        ...state,
        loading: false,
        data: action.departures
      }
    default:
      return state
  }
}

export default rootReducer
