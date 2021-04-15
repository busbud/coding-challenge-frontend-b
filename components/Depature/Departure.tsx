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
    <>
      <p>departureLocation: {departureLocation.name}</p>
      <p>arrivalLocation: {arrivalLocation.name}</p>
      <p>departureTime: {departureTime}</p>
      <p>arrivalTime: {arrivalTime}</p>
      <p>departureCity: {departureCity.name}</p>
      <p>arrivalCity: {arrivalCity.name}</p>
      <p>amount: {amount}</p>
    </>
  )
}