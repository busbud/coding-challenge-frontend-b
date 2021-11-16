import { createContext, FC, useContext, useState } from 'react'
import { Destination, Travel } from '../interfaces'

const headers = {
  Accept:
    'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': 'PARTNER_c9g6z7V0SNqUlnar2EFsxw',
}

interface IContext {
  destinationList: Destination[]
  fetchDepartures(): Promise<void>
  isFetching: boolean
}
const Context = createContext({} as IContext)

export const DestinationProvider: FC = ({ children }) => {
  const [destinationList, setDestinationList] = useState<Destination[]>([])
  const [isFetching, setIsFetching] = useState(false)

  const fetchDepartures = async () => {
    const origin = 'f2m673'
    const destination = 'f25dvk'
    const outBoundDate = '2021-11-20'

    const url = `https://napi.busbud.com/x-departures/${origin}/${destination}/${outBoundDate}?adult=1`

    try {
      setIsFetching(true)
      const response = await fetch(url, { headers })
      const data: Travel = await response.json()

      const findInLocations = (id: number) =>
        data.locations.find(location => location.id === id).name

      const formatDataToDestination = () =>
        data.departures.map(departure => ({
          id: departure.id,
          departureTime: departure.departure_time,
          arrivalTime: departure.arrival_time,
          price: departure.prices.total,
          originLocationName: findInLocations(departure.origin_location_id),
          destinationLocationName: findInLocations(
            departure.destination_location_id
          ),
        }))
      const destination: Destination[] = formatDataToDestination()
      setDestinationList(destination)
    } catch (error) {
      console.error({ error })
    } finally {
      setIsFetching(false)
    }
  }

  const value = {
    destinationList,
    fetchDepartures,
    isFetching,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useDestination = () => useContext(Context)
