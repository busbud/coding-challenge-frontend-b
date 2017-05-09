import {
  ADD_SEARCH_PARAMS,
  FETCHING_BUS_SCHEDULE,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from './types'

import axios from 'axios'

const searchSuccess = (results = {}, lastUpdated) => {

  // filter the resulsts to reduce unecseary maping inside reducer
  const refindedOperators = results.operators.map((opp) => ({
    source_id: opp.source_id,
    name: opp.name,
    logo_url: opp.logo_url
  }))

  const refinedLocations = results.locations.map((loc) => ({
    id: loc.id,
    name: loc.name,
    address: loc.address
  }))

  // set payload here
  const payload = results.departures.map((dep) => ({
    id: dep.id,
    price: dep.prices.total,
    departureTime: dep.departure_time,
    arrivalTime: dep.arrival_time,
    link: dep.links.deeplink,
    destination: refinedLocations.filter((location) => location.id === dep.destination_location_id)[0],
    origin: refinedLocations.filter((location) => location.id === dep.origin_location_id)[0],
    operator: refindedOperators.filter((operator) => operator.source_id === dep.source_id)[0]
  }))

  return (
    {
      type: SEARCH_SUCCESS,
      payload,
      lastUpdated,
    }
  )
}

const searchFailure = (err) => {
  console.error(err)
  return {
    type: SEARCH_FAILURE,
    error: 'Search was not completed please try again later'
  }
}

const fetchingSchedule = () => ({
  type: FETCHING_BUS_SCHEDULE
})

// include promise library
// this is somewhat unecessary for right now
// but something like would be useful in the future
// const searchSubmit = () => ({
//   type: ADD_SEARCH_PARAMS,
//   leaving,
//   returning,
//   departureCity,
//   destinatonCity
// })

// this data should be comming from the url on component will mount
export const search = ({departure, destination, date}, totalRecal=false) => {
  return (dispatch) => {
    // trigger is fetching event
    dispatch(fetchingSchedule())
    axios.get(`https://napi.busbud.com/x-departures/${departure}/${destination}/${date}`,{
      headers: {
        "Accept": "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
        "x-busbud-token":"GUEST_3TaSgronQTeJTZdLcB9Ldg"
      }
    })
    .then((res) => {
      const { data } = res;
      console.log(data)
      if ( data.departures.length > 0 ) {
        // use last updated to refresh
        dispatch(searchSuccess(data, Date.now()))
      } else {
        // redirect page here because the server is probably asleep
        if( totalRecal ){ // total recal is usd to break out of the loop
          dispatch(searchFailure(new Error('Search returned 0 results')))
        }else{
          // recursively search again if the server is sleeping after one second
          setTimeout(() => {
            // alert just so we know
            console.log('zzz... was sleeping sleeping... trying again')
            dispatch(search({departure, destination, date}))
          }, 1000)
        }
      }
    })
    .catch((e) => dispatch(searchFailure(e)))
  }
}

