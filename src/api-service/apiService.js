import { getGeohashForCityName, formatAMPM } from './../utils/utils';
import { BehaviorSubject } from 'rxjs';

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

export function getParsedDeparturesObservable(originCity, destinationCity, date, numberOfPassengers) {
  let parsedDepartures = new BehaviorSubject([]);
  getParsedDepartures(originCity, destinationCity, date, numberOfPassengers, parsedDepartures, 0);
  return parsedDepartures;
}

export function getParsedDepartures(originCity, destinationCity, date, numberOfPassengers, parsedDepartures, index) {
  const originGeohash = getGeohashForCityName(originCity);
  const destinationGeohash = getGeohashForCityName(destinationCity);

  fetch(`https://napi.busbud.com/x-departures/${originGeohash}/${destinationGeohash}/${date}?adult=${numberOfPassengers}&index=${index}`, {
      method: "GET",
      headers: {
        "Accept": "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
        "X-Busbud-Token": "PARTNER_JSWsVZQcS_KzxNRzGtIt1A"
      }
    }
  ).then(response => response.json())
  .then(data => {
    const newDepartures = data.departures.map(departure =>
      parseDeparture(data, departure)
    );
    parsedDepartures.next(newDepartures);
    if (data.complete) {
      return;
    } else {
      const newIndex = index + data.departures.length;
      getParsedDepartures(originCity, destinationCity, date, numberOfPassengers, parsedDepartures, newIndex);
    }
  });
}