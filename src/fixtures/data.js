/* eslint no-undef: "warn"*/
/* eslint camelcase: "warn"*/
export const intialSearch = {
  locations: [{
    id: 1,
    name: 'test loc 1'
  }, {
    id: 2,
    name: 'test loc 2'
  }],
  departures: [
    {
      busbud_departure_id: 'departures1',
      prices: {
        total: 20,
        currency: 'CAD'
      },
      origin_location_id: 1,
      destination_location_id: 2,
      departure_time: '2019-08-12T19:55:00',
      arrival_time: '2019-08-13T19:55:00'
    },
    {
      busbud_departure_id: 'departures2',
      prices: {
        total: 30,
        currency: 'CAD'
      },
      origin_location_id: 1,
      destination_location_id: 2,
      departure_time: '2019-08-12T11:55:00',
      arrival_time: '2019-08-13T19:55:00'
    }
  ],
  complete: false
};

export const pollSearch = {
  locations: [{
    id: 3,
    name: 'test loc 3'
  }, {
    id: 4,
    name: 'test loc 4'
  }],
  departures: [
    {
      busbud_departure_id: 'departures3',
      prices: {
        total: 40,
        currency: 'CAD'
      },
      origin_location_id: 3,
      destination_location_id: 4,
      departure_time: '2019-08-12T19:55:00',
      arrival_time: '2019-08-13T19:55:00'
    },
    {
      busbud_departure_id: 'departures4',
      prices: {
        total: 50,
        currency: 'CAD'
      },
      origin_location_id: 3,
      destination_location_id: 4,
      departure_time: '2019-08-12T11:55:00',
      arrival_time: '2019-08-13T19:55:00'
    }
  ],
  complete: true
};

export const departures = [
  {
    arrivalTime: 'Tue, Aug, 7:55 pm',
    departureTime: 'Mon, Aug, 7:55 pm',
    destLocName: 'test loc 2',
    id: 'departures1',
    originLocName: 'test loc 1',
    price: 20,
    currency: 'CAD'
  },
  {
    arrivalTime: 'Tue, Aug, 7:55 pm',
    departureTime: 'Mon, Aug, 11:55 am',
    destLocName: 'test loc 2',
    id: 'departures2',
    originLocName: 'test loc 1',
    currency: 'CAD',
    price: 30}
];
