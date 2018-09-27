import { mapCitiesToDepartures } from '../../src/utils/Departures';

const CITY_1 = {
  id: 1,
  name: 'city1',
};
const CITY_2 = {
  id: 2,
  name: 'city2',
};

const DEPARTURE_1 = {
  destination_location_id: 2,
  origin_location_id: 1,
  arrival_time: '2018-08-02T22:00:00',
  arrival_timezone: 'America/Montreal',
  available_seats: 49,
  bus: null,
  busbud_departure_id: '35811f76',
  class: 'Economy',
  class_name: '',
  deeplink: null,
  departure_time: '2018-08-02T13:05:00',
  departure_timezone: 'America/New_York',
  departure_type: null,
};

const DEPARTURE_2 = {
  destination_location_id: 1,
  origin_location_id: 2,
  arrival_time: '2018-08-02T22:00:00',
  arrival_timezone: 'America/Montreal',
  available_seats: 49,
  bus: null,
  busbud_departure_id: '35811f76',
  class: 'Economy',
  class_name: '',
  deeplink: null,
  departure_time: '2018-08-02T13:05:00',
  departure_timezone: 'America/New_York',
  departure_type: null,
};

describe('mapCitiesToDepartures', () => {
  it('should exist function', () => {
    expect(mapCitiesToDepartures).toBeDefined();
  });

  it('should create an array', () => {
    const emptyCities = [];
    const emptyDepartures = [];

    expect(mapCitiesToDepartures(emptyCities, emptyDepartures)).toEqual([]);
  });

  it('should map cities to departures', () => {
    const cities = [CITY_1, CITY_2];
    const departures = [DEPARTURE_1, DEPARTURE_2];

    const expectedDeparturesesult = [
      {
        ...DEPARTURE_1,
        originLocation: { ...CITY_1 },
        destinationLocation: { ...CITY_2 },
      },
      {
        ...DEPARTURE_2,
        originLocation: { ...CITY_2 },
        destinationLocation: { ...CITY_1 },
      },
    ];

    expect(mapCitiesToDepartures(cities, departures)).toEqual(expectedDeparturesesult);
    expect(mapCitiesToDepartures(cities, departures)).toHaveLength(2);
  });
});
