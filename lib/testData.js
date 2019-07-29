export const cities = [
  {
    id: 1
  },
  {
    id: 2
  }
];

export const locations = [
  {
    id: 1,
    city_id: 1
  },
  {
    id: 2,
    city_id: 1
  }
];

export const departures = [
  {
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
  },
  {
    id: 2,
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
  },
  {
    id: 3,
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
  }
];

export const operators = [
  {
    id: 1
  },
  {
    id: 2
  }
];

export const selected_date = new Date("August 1, 2019");

export default departures;
