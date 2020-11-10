import moment from 'moment';

const getLocationName = (locations, locationId) => {
  if (!locations?.length) return '';

  return locations.find((loc) => loc.id === locationId).name;
};

export const getDeparturesData = (data) => {
  const { departures, locations } = data;

  if (!departures?.length) return [];

  const departuresData = departures.map((dep) => ({
    id: dep.id,
    dTime: moment(dep.departure_time).format('dddd, MMMM Do YYYY, h:mm:ss a'),
    aTime: moment(dep.arrival_time).format('dddd, MMMM Do YYYY, h:mm:ss a'),
    price: dep.prices.total / 100,
    location: getLocationName(locations, dep.origin_location_id) || '',
  }));

  return departuresData;
};
