import { IXDeparture } from '../../types'
import { useAppContext } from '../../store'
import { getTime } from '../../utils/dateHelpers'
import { formatToCurrency } from '../../utils/currencyHelpers'

interface IProps {
  departure: IXDeparture
}

export default function Depature({ departure }: IProps) {
  const [{ locations, cities }] = useAppContext()

  const departureLocation = locations[departure.origin_location_id]
  const departureTime = getTime(departure.departure_time)
  const departureCity = cities[departureLocation.city_id]

  const arrivalLocation = locations[departure.destination_location_id]
  const arrivalTime = getTime(departure.arrival_time)
  const arrivalCity = cities[arrivalLocation.city_id]

  const amount = formatToCurrency(departure.prices.total, departure.prices.currency, true)

  return (
    <div className="departure-container">
      <div className="departure-info">
        <p className="time">{departureTime}</p>
        <p className="city">{departureCity.name}</p>
        <p className="location">{departureLocation.name}</p>
      </div>

      <div className="route-sign">
        <span className="arrow"></span>
      </div>

      <div className="arrival-info">
        <p className="time">{arrivalTime}</p>
        <p className="city">{arrivalCity.name}</p>
        <p className="location">{arrivalLocation.name}</p>
      </div>

      <div className="price-info">
        <p className="price">{amount}</p>
      </div>
    </div>
  )
}