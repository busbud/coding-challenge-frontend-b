import parseTrips from './parseTrips';
import createApiResponse from './fixtures/createApiResponse';

it('returns trips from API response', () => {
  const apiResponse = createApiResponse();

  const parsedTrips = parseTrips(apiResponse);

  const expectedTrips = [
    {
      operator: {
        name: 'Greyhound',
        logoUrl:
          'https://busbud-pubweb-assets-staging.global.ssl.fastly.net/images-service/operator-logos/greyhound.png?hash=1{&height,width}'
      },
      departure: {
        name: '4211 Broadway',
        time: '2016-01-14T00:01:00'
      },
      arrival: {
        name: 'Métro Radisson',
        time: '2016-01-14T07:55:00'
      },
      price: '52 $'
    },
    {
      operator: {
        name: 'Greyhound',
        logoUrl:
          'https://busbud-pubweb-assets-staging.global.ssl.fastly.net/images-service/operator-logos/greyhound.png?hash=1{&height,width}'
      },
      departure: {
        name: '34th St & 9th Ave',
        time: '2016-01-14T00:10:00'
      },
      arrival: {
        name: 'Saint-Denis & Saint-Joseph',
        time: '2016-01-14T08:25:00'
      },
      price: '55 $'
    }
  ];
  expect(parsedTrips).toEqual(expectedTrips);
});

it('returns an empty array if API response is empty', () => {
  const parsedTrips = parseTrips({});

  expect(parsedTrips).toEqual([]);
});

it('returns valid trips when not all locations are present in API response', () => {
  const apiResponse = createApiResponse();
  apiResponse.locations = [
    {
      id: 24010,
      city_id: '375dd587-9001-acbd-84a4-683deda84183',
      name: '34th St & 9th Ave',
      address: ['367 W 34th St', 'New York', 'NY 10001, USA'],
      type: 'bus_stop',
      lat: 40.7533974783186,
      lon: -73.9958676695824,
      geohash: 'dr5ru4vve'
    },
    {
      id: 25179,
      city_id: '375dd587-9001-acbd-84a4-683dedfb933e',
      name: 'Métro Radisson',
      address: ['7200 Rue Sherbrooke E', 'Montréal, QC H1N 1E7', 'Canada'],
      type: 'bus_stop',
      lat: 45.5888,
      lon: -73.53948,
      geohash: 'f25eqe4nj'
    }
  ];

  const parsedTrips = parseTrips(apiResponse);

  const expectedTrips = [
    {
      operator: {
        name: 'Greyhound',
        logoUrl:
          'https://busbud-pubweb-assets-staging.global.ssl.fastly.net/images-service/operator-logos/greyhound.png?hash=1{&height,width}'
      },
      departure: {
        name: '',
        time: '2016-01-14T00:01:00'
      },
      arrival: {
        name: 'Métro Radisson',
        time: '2016-01-14T07:55:00'
      },
      price: '52 $'
    },
    {
      operator: {
        name: 'Greyhound',
        logoUrl:
          'https://busbud-pubweb-assets-staging.global.ssl.fastly.net/images-service/operator-logos/greyhound.png?hash=1{&height,width}'
      },
      departure: {
        name: '34th St & 9th Ave',
        time: '2016-01-14T00:10:00'
      },
      arrival: {
        name: '',
        time: '2016-01-14T08:25:00'
      },
      price: '55 $'
    }
  ];
  expect(parsedTrips).toEqual(expectedTrips);
});

it('returns valid trips when not all operators are present in API response', () => {
  const apiResponse = createApiResponse();
  apiResponse.operators = [];

  const parsedTrips = parseTrips(apiResponse);

  const expectedTrips = [
    {
      operator: {
        name: '',
        logoUrl: ''
      },
      departure: {
        name: '4211 Broadway',
        time: '2016-01-14T00:01:00'
      },
      arrival: {
        name: 'Métro Radisson',
        time: '2016-01-14T07:55:00'
      },
      price: '52 $'
    },
    {
      operator: {
        name: '',
        logoUrl: ''
      },
      departure: {
        name: '34th St & 9th Ave',
        time: '2016-01-14T00:10:00'
      },
      arrival: {
        name: 'Saint-Denis & Saint-Joseph',
        time: '2016-01-14T08:25:00'
      },
      price: '55 $'
    }
  ];
  expect(parsedTrips).toEqual(expectedTrips);
});
