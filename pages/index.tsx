import { InferGetServerSidePropsType } from 'next'
import { useContext, useEffect } from 'react'

import { getXDepartures } from '../utils/api'
import { AppContext } from '../store'
import { ORIGIN_GEOHASH, DESTINATION_GEOHASH, FESTIVAL_DATE } from '../utils/constants'

export default function HomePage(
  { cities, locations, departures, pollComplete }: InferGetServerSidePropsType<typeof getStaticProps>
) {
  const [, dispatch] = useContext(AppContext)

  useEffect(() => {
    cities.map(city => dispatch({
      type: "ADD_CITY",
      payload: city
    }))

    locations.map(location => dispatch({
      type: 'ADD_LOCATION',
      payload: location
    }))

    departures.map(departure => dispatch({
      type: "ADD_DEPARTURE",
      payload: departure
    }))

    pollComplete && dispatch({ type: 'COMPLETE_POLL' })
  }, [])

  return (
    null
  )
}

export async function getStaticProps() {
  const response = await getXDepartures({
    origin: ORIGIN_GEOHASH,
    destination: DESTINATION_GEOHASH,
    outboundDate: FESTIVAL_DATE
  })

  return {
    props: {
      cities: response.cities,
      locations: response.locations,
      departures: response.departures,
      pollComplete: response.complete
    }
  }
}
