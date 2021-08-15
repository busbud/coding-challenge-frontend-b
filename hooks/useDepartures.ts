import React from 'react'
import { ExtraDepartureParameters, getDepartures } from '../api'
import { Departure, Location } from '../types'

const POLL_TIMEOUT = 2000

const useDepartures = () => {
  const [departures, setDepartures] = React.useState<Departure[]>([])
  const [locations, setLocations] = React.useState<Location[]>([])
  const [loading, setLoading] = React.useState(false)
  const [stale, setStale] = React.useState(false)

  const search = React.useCallback(
    async (
      origin: string,
      destination: string,
      outboundDate: string,
      extraParameters: ExtraDepartureParameters = {}
    ) => {
      let index: number | undefined
      let complete = false
      setLoading(true)
      setStale(true)
      let _stale = true
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
          extraParameters,
          index
        )
        complete = _complete
        index = (index ?? 0) + _departures.length
        if (_stale && (_departures.length > 0 || complete)) {
          // Only after we got some results, let's clear the list first
          // for a less jarring UX. Could also have a different behavior here
          // also clear if we're done searching, with no results
          setDepartures([])
          setLocations([])
          setStale(false)
          _stale = false
        }
        setDepartures(__departures => {
          // I was still getting some repeated departure ids, even when seemingly passing the correct index.
          // So, removing duplicates
          const previousIds = __departures.map(({ id }) => id)
          return [
            ...__departures,
            ..._departures.filter(({ id }) => !previousIds.includes(id))
          ]
        })
        setLocations(__locations => [...__locations, ..._locations])
      }
      setLoading(false)
    },
    []
  )
  return { departures, locations, loading, stale, search }
}

export default useDepartures
