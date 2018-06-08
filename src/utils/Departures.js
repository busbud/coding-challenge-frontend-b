export const mapCitiesToDepartures = (cities, departures) => departures.map((departure) => {
  const originLocation = cities.find(city => city.id === departure.origin_location_id);
  const destinationLocation = cities.find(city => city.id === departure.destination_location_id);

  return {
    ...departure,
    originLocation,
    destinationLocation,
  };
});

export default mapCitiesToDepartures;
