import {
  SEARCH_SUBMIT,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from '../actions/types'

const defualtSearchState = {
  isFetching: false,
  leaving: undefined,
  returning: undefined,
  departureCity: { name: "New York" , geoCode: "" },
  destinationCity: { name: "Montreal", geoCode: "" }
}

export const search = (state = defualtSearchState, action) => {
  switch (action.type) {
    case SEARCH_SUBMIT:
      return {
        ...state,
        isFetching: true,
        leaving: action.leaving,
        returning: action.returning,
        departure: action.departure,
        destination: action.destination
      }
    case SEARCH_SUCCESS :
      return {
        ...state,
        isFetching: false,
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

const results = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_SUCCESS :
      return {
        ...state,
        showResults: true,
        searchResults: []
      }
  }
}


