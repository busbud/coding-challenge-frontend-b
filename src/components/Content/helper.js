export const getDeparturesWithCityAndPrices = (data) => {
  const { departures, locations, cities } = data;
  return departures.map(({
    departure_time,
    arrival_time,
    prices,
    origin_location_id,
    destination_location_id
  }) => {
    const cityPair = {
      departure_location: null,
      arrival_location: null
    }

    for (let location of locations) {
      const { id, city_id, name } = location;

      const city_name = (city_id === cities[0].id) ? cities[0].name : cities[1].name;

      if (origin_location_id === id) cityPair.departure_location = {
        city_name, name
      };
      if (destination_location_id === id) cityPair.arrival_location = {
        city_name, name
      };

      const { departure_location, arrival_location } = cityPair;
      if (departure_location && arrival_location) break;
    }
    return {
      departure_time,
      arrival_time,
      total_price: prices.total,
      ...cityPair
    }
  })
}