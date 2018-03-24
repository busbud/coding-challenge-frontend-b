var axios = require("axios");
var moment = require("moment-timezone");

var busbud = axios.create({
  baseURL: "https://napi.busbud.com/x-departures/",
  timeout: 1000,
  headers: {
    "Accept": "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
    "X-Busbud-Token": "PARTNER_JSWsVZQcS_KzxNRzGtIt1A"
  }
});

function findLocation(locationId, locations) {
  return locations.find(loc => loc.id === locationId);
};

function calculateTime(inTime, inTimeZone) {
  return moment.tz(inTime, inTimeZone).format('LLLL');
};

function parseDeparture(departure, locations) {
  let destinationLocation = findLocation(departure.destination_location_id, locations);
  let originLocation = findLocation(departure.origin_location_id, locations);
  let destinationTime = calculateTime(departure.arrival_time, departure.arrival_timezone);
  let originTime = calculateTime(departure.departure_time, departure.departure_timezone);

  return {
    price: departure.prices.total,
    departTime: destinationTime,
    arriveTime: originTime,
    originLocationName: originLocation.name,
    destinationLocationName: destinationLocation.name
  };
};

busbud.search = function(source, destination, date, options = {}) {
  let params = {
    adult: 1,
    child: 0,
    senior: 0,
    lang: "CA",
    currency: "CAD"
  };

  params = Object.assign(params, options);
  return new Promise(function(resolve, reject) {
    busbud.get("/" + source + "/" + destination + "/" + date, params)
      .then(function(response) {
        resolve(response.data);
      }).catch(function(error) {
        reject(error);
      });
  });
};

busbud.parseDepartures = function(results) {
  return results.departures.map(departure => parseDeparture(departure, results.locations));
};

module.exports = busbud;
