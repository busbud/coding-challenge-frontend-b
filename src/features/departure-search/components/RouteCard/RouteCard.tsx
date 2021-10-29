import { Departure, Location, City } from '../../types'
import { formatTimeToLocale, formatCurrencyToLocale } from '../../utils'

import styles from './RouteCard.module.scss'

export interface RouteCardProps {
  departure: Departure
  locations: Location[]
  cities: City[]
  operator: { name: string; logo_url: string }
}

export function RouteCard({
  departure,
  locations,
  cities,
  operator,
}: RouteCardProps): JSX.Element {
  function getLocationById(id: number): Location | null {
    const location = locations.find((location: Location) => location.id === id)
    return location || null
  }
  function getCityNameById(id: string): string {
    const city = cities.find((city: City) => city.id === id)
    return city ? city.name : ''
  }
  function getDuration(duration: number): string {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60
    return `${hours}h ${minutes}m`
  }

  const origLocation = getLocationById(departure.origin_location_id)
  const destLocation = getLocationById(departure.destination_location_id)

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <img
          className={styles.operatorLogo}
          src={operator.logo_url}
          alt={operator.name}
        />
        <div className={styles.price}>
          <span className={styles.icon}>🏷</span>
          <span>
            {formatCurrencyToLocale(
              departure.prices.total / 100, // covert cents to dollars
              departure.prices.currency
            )}
          </span>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.routeDetails}>
          <span className={styles.icon}>📍</span>
          <span className={styles.time}>
            {formatTimeToLocale(departure.departure_time)}
          </span>
          <span className={styles.location}>
            {getCityNameById(origLocation!.city_id)} - {origLocation!.name}
          </span>
        </div>
        <div className={styles.routeDetails}>
          <span className={styles.icon}>🎯</span>
          <span className={styles.time}>
            {formatTimeToLocale(departure.arrival_time)}
          </span>
          <span className={styles.location}>
            {getCityNameById(destLocation!.city_id)} - {destLocation!.name}
          </span>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.vehicle}>
          <span className={styles.icon}>🚍</span> {departure.vehicle_type}
        </div>
        <div className={styles.duration}>
          <span className={styles.icon}>🕓</span>{' '}
          {getDuration(departure.duration)}
        </div>
        <div>
          <span className={styles.icon}>🚏</span> {departure.trip_stops.length}{' '}
          {`stop${departure.trip_stops.length > 1 && 's'}`}
        </div>
        <a
          className={styles.buyBtn}
          href={departure.links.deeplink}
          target="_blank"
          rel="noreferrer"
        >
          Buy on Busbud
        </a>
      </div>
    </div>
  )
}
