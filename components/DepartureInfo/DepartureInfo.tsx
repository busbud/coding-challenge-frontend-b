import { useRouter } from 'next/router'
import { Departure, Location } from '../../types'
import { formatCurrency, formatTime } from '../../utils'
import DownArrow from '../icons/DownArrow'
import Price from '../icons/Price'
import UpArrow from '../icons/UpArrow'
import styles from './DepartureInfo.module.css'

type Props = {
  departure: Departure
  locationMap: Record<number, Location>
}

export default function DepartureInfo(props: Props) {
  const { locale } = useRouter()
  const {
    departure: {
      departure_time,
      origin_location_id,
      arrival_time,
      destination_location_id,
      prices: { total: totalPrice, currency }
    },
    locationMap
  } = props

  return (
    <div className={styles.entry}>
      <div className={styles.departure}>
        <div className={styles.icon}>
          <UpArrow />
        </div>
        <div className={styles.content}>
          <div className={styles.time}>
            {formatTime(departure_time, locale)}
          </div>
          <div className={styles.location}>
            {locationMap[origin_location_id]?.name ?? '??'}
          </div>
        </div>
      </div>
      <div className={styles.arrival}>
        <div className={styles.icon}>
          <DownArrow />
        </div>
        <div className={styles.content}>
          <div className={styles.time}>{formatTime(arrival_time, locale)}</div>
          <div className={styles.location}>
            {locationMap[destination_location_id]?.name ?? '??'}
          </div>
        </div>
      </div>
      <div className={styles.price}>
        <Price />
        <div>{formatCurrency(totalPrice / 100, currency, locale)}</div>
      </div>
    </div>
  )
}
