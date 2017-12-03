import utils from "../utils/utils"

function parseDeparture(rawDeparture, locations, operators) {

  // Get operator
  const operator = operators.find((op) => op.id === rawDeparture.operator_id);

  // Get locations
  let originLocation = null;
  let destLocation = null;
  locations.forEach(loc => {
    if (!originLocation && loc.id === rawDeparture.origin_location_id) {
      originLocation = loc;
    }
    else if (!destLocation && loc.id === rawDeparture.destination_location_id) {
      destLocation = loc;
    }
    if (originLocation && destLocation) {
      return;
    }
  });

  return {
    id: rawDeparture.id,
    departureTime: utils.parseTime(rawDeparture.departure_time),
    arrivalTime: utils.parseTime(rawDeparture.arrival_time),
    duration: rawDeparture.duration,
    price: rawDeparture.prices.total/100.0,
    currency: rawDeparture.prices.currency,
    operatorName: operator.name,
    operatorLogoUrl: operator.logo_url,
    origin: originLocation.name,
    destination: destLocation.name,
  }
}

// Returns a list of departures
const parser = {
  parse: function(data) {
    return data.departures.map(dep => parseDeparture(dep, data.locations, data.operators))
  }
};

export default parser;