import { ResponseSearch, ResponseCity, XDeparture, Departure, Location } from 'types';

export const citiesAsRecord = (response: ResponseSearch): Record<string, ResponseCity> => {
  const citiesAsRecord = {} as Record<string, ResponseCity>;
  response.cities.forEach(city => { 
    citiesAsRecord[city.name] = city;
  });
  return citiesAsRecord;
}

export const processDepartures = (unprocessed: Array<XDeparture>, locations: Array<Location>): Array<Departure> => {
  const departures: Array<Departure>  = [];

  unprocessed.forEach((departure) => {
    const location = locations.find((loc) => loc.id === departure.destination_location_id);
    departures.push({
      start: departure.departure_time,
      end: departure.arrival_time,
      location: location ? location.name : '',
      price: departure.prices.total,
      currency: departure.prices.currency
    } as Departure);
  });

  return departures;
}

type ProcessedDate = {
  date: string;
  time: string;
}

export const processDate = (d: Date): ProcessedDate => {
  const base = new Date(d).toLocaleString('en-US', { timeZone: 'UTC' }).split(',');

  return {
    date: base[0],
    time: base[1].replace(/(:\d{2} ([AP]M))$/, ' $2') // Remove seconds
  }
}