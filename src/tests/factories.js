export const initResults = {
  locations: [
    {
      id: 3970,
      name: 'Métro Bonaventure Bus Station',
    }, {
      id: 4390,
      name: 'George Washington Bridge',
    },
  ],
  operators: [
    {
      id: 'bfc27cd544ca49c18d000f2bc00c58c0',
      name: 'Greyhound',
    },
  ],
  departures: [
    {
      id: '7c5dd26a',
      operator_id: 'bfc27cd544ca49c18d000f2bc00c58c0',
      origin_location_id: 3970,
      destination_location_id: 4390,
      prices: {
        total: 6000,
      },
      departure_time: '2016-01-14T00:01:00',
      arrival_time: '2016-01-14T07:55:00',
    },
  ],
};

export const polledResults = {
  operators: [
    {
      id: 'efc27cd544ca49c18d000f2bc00c58c0',
      name: 'Adirondack Trailways',
    },
  ],
  departures: [
    {
      operator_id: 'efc27cd544ca49c18d000f2bc00c58c0',
      origin_location_id: 3970,
      destination_location_id: 4390,
      prices: {
        total: 5000,
      },
      departure_time: '2016-01-14T00:01:00',
      arrival_time: '2016-01-14T07:55:00',
    },
  ],
};
