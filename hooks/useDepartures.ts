import React from 'react'
import { ExtraDepartureParameters, getDepartures } from '../api'
import { Departure, Location } from '../types'

const POLL_TIMEOUT = 2000

const useDepartures = () => {
  const [departures, setDepartures] = React.useState<Departure[]>([])
  const [locations, setLocations] = React.useState<Location[]>([])
  const [loading, setLoading] = React.useState(false)
  const [dirty, setDirty] = React.useState(false)

  const search = async (
    origin: string,
    destination: string,
    outboundDate: string,
    extraParameters: ExtraDepartureParameters = {}
  ) => {
    let index: number | undefined
    let complete = false
    setLoading(true)
    setDirty(true)
    while (!complete) {
      if (index !== undefined) {
        // wait 2 seconds between subsequent calls
        await new Promise(resolve => {
          setTimeout(resolve, POLL_TIMEOUT)
        })
      }
      const {
        locations: _locations,
        departures: _departures,
        complete: _complete
      } = await getDepartures(
        origin,
        destination,
        outboundDate,
        extraParameters
      )
      complete = _complete
      index = _departures.length
      if (index>0 || complete) {
        // Only after we got some results, let's clear the list first
        // for a less jarring UX. Could also have a different behavior here
        // also clear if we're done searching, with no results
        setDepartures([])
        setLocations([])
        setDirty(false)
      }
      setDepartures(departures => [...departures, ..._departures])
      setLocations(locations => [...locations, ..._locations])
    }
    setLoading(false)
  }
  return { departures, locations, loading, dirty, search }
}

export default useDepartures
