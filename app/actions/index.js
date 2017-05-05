import {
  SEARCH_SUBMIT,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from './types'

// include promise library
const searchSubmit = () => ({
  type: SEARCH_SUBMIT,
  leaving,
  returning,
  departureCity,
  destinatonCity
})

const searchSuccess = (res = []) => {

  const results = res.map((arr) => arr)

  return (
    {
      type: SEARCH_SUCCESS,
      results,
    }
  )
}

const searchFailure = () => {
  return {
    type: SEARCH_FAILURE,
    error: 'Search was not completed please try again later'
  }
}

// this data should be comming from the url on component will mount
export const search = ({departure, destinaton, departing, returning}) => {
// submit the qeury
// trigger is fetching event
// set current search value

// if the request is good
  // is no longer fetching
  // load results

// if the request is bad
  // is no longer fetching
  // redirect to
  return (dispatch) => {



  }

}

