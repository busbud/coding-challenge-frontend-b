export default apiResponse => {
  if (!apiResponse.departures) return [];

  return apiResponse.departures.map(
    ({
      id,
      prices,
      origin_location_id,
      departure_time,
      destination_location_id,
      arrival_time,
      operator_id
    }) => ({
      id,
      departure: {
        name: getLocationName(apiResponse.locations, origin_location_id),
        time: departure_time
      },
      arrival: {
        name: getLocationName(apiResponse.locations, destination_location_id),
        time: arrival_time
      },
      operator: getOperator(apiResponse.operators, operator_id),
      price: `${prices.total / 100} $`
    })
  );
};

function getLocationName(locations, locationId) {
  const matchedLocation = locations.find(({ id }) => id === locationId);
  return matchedLocation ? matchedLocation.name : '';
}

function getOperator(operators, operatorId) {
  const matchedOperator = operators.find(({ id }) => id === operatorId);
  if (!matchedOperator) return { logoUrl: '', name: '' };

  return {
    logoUrl: matchedOperator.logo_url,
    name: matchedOperator.display_name
  };
}
