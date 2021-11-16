import { Destination, Travel } from '../interfaces'

const headers = {
  Accept:
    'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': 'PARTNER_c9g6z7V0SNqUlnar2EFsxw',
}

const formatDataToDestination = (data: Travel) => {
  const findInLocations = (id: number) =>
    data.locations.find(location => location.id === id).name

  return data.departures.map(departure => ({
    id: departure.id,
    departureTime: departure.departure_time,
    arrivalTime: departure.arrival_time,
    price: departure.prices.total,
    originLocationName: findInLocations(departure.origin_location_id),
    destinationLocationName: findInLocations(departure.destination_location_id),
  }))
}

export const fetchDepartures = async () => {
  const origin = 'f2m673'
  const destination = 'f25dvk'
  const outBoundDate = '2021-11-20'

  const url = `https://napi.busbud.com/x-departures/${origin}/${destination}/${outBoundDate}?adult=1`

  try {
    const response = await fetch(url, { headers })
    const data: Travel = await response.json()

    const destination: Destination[] = formatDataToDestination(data)
    return destination
  } catch (error) {
    return null
  }
}
