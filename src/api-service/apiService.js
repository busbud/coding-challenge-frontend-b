import { getGeohashForCityName, formatAMPM } from './../utils/utils';

function parseDeparture(data, departure) {
  const departureTime = formatAMPM(new Date(departure.departure_time));
  const arrivalTime = formatAMPM(new Date(departure.arrival_time));

  const departureLocation = data.locations.find(
    location => location.id === departure.origin_location_id
  ).name;
  const arrivalLocation = data.locations.find(
    location => location.id === departure.destination_location_id
  ).name;

  const operatorName = data.operators.find(
    operator => operator.id === departure.operator_id
  ).name;

  const price = departure.prices.total;

  return {
    departureTime,
    arrivalTime,
    departureLocation,
    arrivalLocation,
    price,
    operatorName
  };
}

export function getParsedDepartures(originCity, destinationCity, date, numberOfPassengers) {
  return new Promise((resolve, reject) => {
    const originGeohash = getGeohashForCityName(originCity);
    const destinationGeohash = getGeohashForCityName(destinationCity);

    fetch(
      `https://napi.busbud.com/x-departures/${originGeohash}/${destinationGeohash}/${date}?adult=${numberOfPassengers}`,
      {
        method: "GET",
        headers: {
          Accept:
            "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
          "X-Busbud-Token": "PARTNER_JSWsVZQcS_KzxNRzGtIt1A"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        resolve(data.departures.map(departure => parseDeparture(data, departure)));
      });
  });
}
