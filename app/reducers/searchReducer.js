import {
  ADD_SEARCH_PARAMS,
  FETCHING_BUS_SCHEDULE,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from '../actions/types'

const defualtSearchState = {
  isFetching: false,
  // leaving: undefined,
  // returning: undefined,
  // departureCity: { name: "New York" , geoCode: "" },
  // destinationCity: { name: "Montreal", geoCode: "" }
}

const search = (state = defualtSearchState, action) => {
  switch (action.type) {
    // not being used
    // case ADD_SEARCH_PARAMS :
    //   return {
    //     ...state,
    //     leaving: action.leaving,
    //     returning: action.returning,
    //     departure: action.departure,
    //     destination: action.destination
    //   }
    case FETCHING_BUS_SCHEDULE :
      return {
        ...state,
        isFetching: true,
      }
    case SEARCH_SUCCESS :
      return {
        ...state,
        isFetching: false
      }
    case SEARCH_FAILURE :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default :
      return { ...state }
  }
}

export default search


