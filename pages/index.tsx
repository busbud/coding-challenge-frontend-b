import { InferGetServerSidePropsType } from 'next'
import { useEffect } from 'react'

import { getXDepartures } from '../utils/api'
import { useAppContext, addCity, addDeparture, addLocation, completePoll } from '../store'
import { ORIGIN_GEOHASH, DESTINATION_GEOHASH, FESTIVAL_DATE } from '../utils/constants'
import DepartureList from  '../components/DepartureList'

export default function HomePage(
  { cities, locations, departures, pollCompleted }: InferGetServerSidePropsType<typeof getStaticProps>
) {
  const [, dispatch] = useAppContext()

  useEffect(() => {
    cities.forEach(city => dispatch(addCity(city)))
    locations.forEach(location => dispatch(addLocation(location)))
    departures.map(departure => dispatch(addDeparture(departure)))
    pollCompleted && dispatch(completePoll())
  }, [])

  return (
    <DepartureList pollCompleted={pollCompleted} />
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
      pollCompleted: response.complete
    }
  }
}
