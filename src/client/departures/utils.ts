import { LuxonDateTime } from '../dependencies';
import { City, DepartureResponse, Location, Price } from '../../api';

const invalidLocation: Location = {
  id: Math.random(),
  name: 'Invalid',
  arrival_timezone: '',
  departure_timezone: '',
  city_id: Math.random().toString(16),
};

const invalidCity: City = {
  id: Math.random().toString(16),
  name: 'Invalid',
  timezone: '',
};

export const getCity = (cities: City[], cityId: string) =>
  cities.find((c) => c.id === cityId) ?? invalidCity;

export const getLocation = (locations: Location[], locationId: number) =>
  locations.find((l) => l.id === locationId) ?? invalidLocation;

export const enrichDepartures = (response: DepartureResponse) => {
  const {
    origin_city_id,
    destination_city_id,
    cities,
    locations,
    departures,
  } = response;

  return departures.map((departure) => {
    const { destination_location_id } = departure;
    const destination_location = getLocation(
      locations,
      destination_location_id,
    );

    return {
      ...departure,
      destination_location,
    };
  });
};

export const getPrice = ({ total, currency }: Price) => `${total} ${currency}`;

export const timeToLocalTime = (time: string, zone: string) =>
  LuxonDateTime.fromISO(time, { zone }).toLocaleString(
    LuxonDateTime.DATETIME_FULL,
  );
