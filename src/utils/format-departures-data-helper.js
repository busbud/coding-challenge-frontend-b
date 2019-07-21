function findLocationName(locationId, locations) {
  const location = _.find(locations, location => location.id === locationId);
  return location.name;
}

export function formatDeparturesData(data) {
  const { newDepartures, locations } = data;

  return _.map(newDepartures, departure => {
    const { origin_location_id, destination_location_id } = departure;
    return {
      ...departure,
      origin_location_name: findLocationName(origin_location_id, locations),
      destination_location_name: findLocationName(
        destination_location_id,
        locations
      )
    };
  });
}
