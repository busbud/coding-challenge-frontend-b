export function findLocationName(locationId, locations) {
  const location = _.find(locations, location => location.id === locationId);
  return location.name;
}
