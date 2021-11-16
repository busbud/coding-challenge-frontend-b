import { createContext, FC, useContext, useState } from 'react'
import { Destination, FetchStatus } from '../interfaces'
import { fetchDepartures } from '../services/departures'

interface IContext {
  destinationList: Destination[]
  getDepartures(): Promise<void>
  fetchingStatus: FetchStatus
}
const Context = createContext({} as IContext)

export const DestinationProvider: FC = ({ children }) => {
  const [destinationList, setDestinationList] = useState<Destination[]>([])
  const [fetchingStatus, setFetchingStatus] = useState(FetchStatus.initial)

  const getDepartures = async () => {
    setFetchingStatus(FetchStatus.loading)

    const departures = await fetchDepartures()

    if (!departures) {
      setFetchingStatus(FetchStatus.error)
      return
    }

    setFetchingStatus(FetchStatus.success)
    setDestinationList(departures)
  }

  const value = {
    destinationList,
    getDepartures,
    fetchingStatus,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useDestination = () => useContext(Context)
