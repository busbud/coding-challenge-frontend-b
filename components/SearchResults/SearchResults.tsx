import React from 'react'
import { Departure, Location } from '../../types'
import DepartureInfo from '../DepartureInfo/DepartureInfo'
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay'
import styles from './SearchResults.module.css'

type Props = {
  locations: Location[]
  departures: Departure[]
  loading?: boolean
}

const prepLocationMap = (locations: Location[]) =>
  locations.reduce((obj, location) => {
    obj[location.id] = location
    return obj
  }, {} as Record<number, Location>)

export default function SearchResults({
  loading,
  departures,
  locations
}: Props) {
  const locationMap = prepLocationMap(locations)

  return (
    <div
      className={`${styles.results} ${loading && departures && styles.loading}`}
    >
      {departures.map(departure => (
        <DepartureInfo
          key={departure.id}
          departure={departure}
          locationMap={locationMap}
        />
      ))}
      {loading && <LoadingOverlay />}
    </div>
  )
}
