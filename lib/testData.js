export const cities = [
  {
    id: 1,
    name: "New York"
  },
  {
    id: 2,
    name: "Montreal"
  }
];

export const locations = [
  {
    id: 1,
    city_id: 1,
    name: "Port Authority"
  },
  {
    id: 2,
    city_id: 1,
    name: "Grand Central Station"
  },
  {
    id: 3,
    city_id: 2,
    name: "Gare d'autocars"
  },
  {
    id: 4,
    city_id: 2,
    name: "Place Saint Henri"
  }
];

export const departure = {
  id: 1,
  origin_city: { id: 1, name: "New York" },
  origin_city_id: 1,
  origin_location: { id: 1, name: "Port Authority" },
  origin_location_id: 1,
  destination_city: { id: 1, name: "Montreal" },
  destination_city_id: 1,
  destination_location: { id: 1, name: "Gare d'autocars" },
  destination_location_id: 1,
  operator: { id: 1, name: "Greyhound" },
  operator_id: 1,
  departure_time: "2019-08-01T01:30:00",
  arrival_time: "2019-08-01T08:30:00",
  prices: {
    total: 5200,
    currency: "CAD"
  }
};

export const departures = [
  {
    id: 1,
    origin_city_id: 1,
    origin_location_id: 1,
    destination_city_id: 2,
    destination_location_id: 1,
    operator_id: 1,
    departure_time: "2019-08-01T01:30:00",
    arrival_time: "2019-08-01T08:30:00",
    prices: {
      total: 5100,
      currency: "CAD"
    }
  },
  {
    id: 2,
    origin_city_id: 1,
    origin_location_id: 1,
    destination_city_id: 2,
    destination_location_id: 2,
    operator_id: 1,
    departure_time: "2019-08-01T02:30:00",
    arrival_time: "2019-08-01T09:30:00",
    prices: {
      total: 5200,
      currency: "CAD"
    }
  },
  {
    id: 3,
    origin_city_id: 1,
    origin_location_id: 2,
    destination_city_id: 2,
    destination_location_id: 1,
    operator_id: 1,
    departure_time: "2019-08-01T03:30:00",
    arrival_time: "2019-08-01T10:30:00",
    prices: {
      total: 5300,
      currency: "CAD"
    }
  }
];

export const operators = [
  {
    id: 1,
    name: "Greyhound"
  },
  {
    id: 2,
    name: "National Express"
  }
];

export const selected_date = new Date("August 1, 2019");

export default departures;
