import { createContext, FC, useContext, useState } from 'react'
import { Departure } from '../interfaces'

const headers = {
  Accept:
    'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': 'PARTNER_c9g6z7V0SNqUlnar2EFsxw',
}

interface Fetch {
  list: Departure[]
  fetchDepartures(): Promise<void>
  isFetching: boolean
}
const Context = createContext({} as Fetch)

export const DestinationProvider: FC = ({ children }) => {
  const [list, setList] = useState<Departure[]>([])
  const [isFetching, setIsFetching] = useState(false)

  const fetchDepartures = async () => {
    const origin = 'f2m673'
    const destination = 'f25dvk'
    const outBoundDate = '2021-11-20'

    const url = `https://napi.busbud.com/x-departures/${origin}/${destination}/${outBoundDate}?adult=1`

    try {
      setIsFetching(true)
      const response = await fetch(url, { headers })
      const { departures } = await response.json()
      setList(departures)
    } catch (error) {
      console.error({ error })
    } finally {
      setIsFetching(false)
    }
  }

  const value = {
    list,
    fetchDepartures,
    isFetching,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useDestination = () => useContext(Context)
