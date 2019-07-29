import timediff from 'timediff'

async function fetchData(request) {
  const response = await fetch(request)
  const data = await response.json()
  return data
}

function mapDepaturesToOptions({
  departures,
  operators,
  locations,
  cities,
  destination_city_id,
  origin_city_id,
}) {
  return departures.map(departure => {
    const {
      departure_time,
      arrival_time,
      operator_id,
      destination_location_id,
      origin_location_id,
      prices,
    } = departure
    const operator = operators.find(item => item.id === operator_id).name

    const arrivalAddress = locations.find(
      location => location.id === destination_location_id
    ).name

    const arrivalCity = cities.find(city => city.id === destination_city_id)
      .name

    const departureAddress = locations.find(
      location => location.id === origin_location_id
    ).name

    const departureCity = cities.find(city => city.id === origin_city_id).name

    const departureTimeNoFormat = new Date(departure_time)
    const departureTime = departureTimeNoFormat.toLocaleTimeString()

    const arrivalTimeNoFormat = new Date(arrival_time)
    const arrivalTime = arrivalTimeNoFormat.toLocaleTimeString()

    const travelTime = timediff(
      departureTimeNoFormat,
      arrivalTimeNoFormat,
      'Hm'
    )

    const price = prices.total * 0.01

    const currency = prices.currency

    return {
      departureTime,
      departureAddress,
      departureCity,
      arrivalTime,
      arrivalAddress,
      arrivalCity,
      travelTime,
      operator,
      price,
      currency,
    }
  })
}

export async function fetchBusOptions({
  outboundDate,
  origin,
  destination,
  setBusOptions,
}) {
  let data = null
  let startFetch = null
  let stopFetch = null

  if ((outboundDate, origin, destination)) {
    const headers = new Headers()

    headers.append(
      'Accept',
      'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/'
    )
    headers.append('X-Busbud-Token', process.env.REACT_APP_BUSBUD_TOKEN)

    const request = new Request(
      `https://napi.busbud.com/x-departures/${origin}/${destination}/${outboundDate}`,
      {
        headers,
      }
    )

    startFetch = new Date().getTime()
    stopFetch = new Date().getTime()
    setBusOptions({ isLoading: true })

    while (!data || (!data.complete && stopFetch - startFetch < 10000)) {
      data = await fetchData(request)
      stopFetch = new Date().getTime()
    }

    if (data && data.complete && data.departures.length) {
      const {
        origin_city_id,
        destination_city_id,
        cities,
        departures,
        locations,
        operators,
      } = data

      const options = mapDepaturesToOptions({
        departures,
        operators,
        locations,
        cities,
        destination_city_id,
        origin_city_id,
      })

      setBusOptions({ isLoading: false, options })
    } else {
      setBusOptions({ isLoading: false, options: null })
    }
  }
}

export function getUserLanguage() {
  const userLang = navigator.language || navigator.userLanguage
  const userLangInitials = userLang.slice(0, 2).toUpperCase()
  const initLangInitials =
    userLangInitials === 'EN' || userLangInitials === 'FR'
      ? userLangInitials
      : 'EN'

  return initLangInitials
}
