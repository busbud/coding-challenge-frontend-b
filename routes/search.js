var express = require("express");
var router = express.Router();
var busbud = require("../lib/busbud");
var moment = require("moment-timezone");
var accounting = require("accounting");

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
    price: accounting.formatMoney(departure.prices.total / 100),
    departTime: destinationTime,
    arriveTime: originTime,
    originLocationName: originLocation.name,
    destinationLocationName: destinationLocation.name
  };
};

function parseDepartures(results) {
  return results.departures.map(departure => parseDeparture(departure, results.locations));
};

router.post("/", function(req, res) {
  let params = req.body;
  let sourceCityGeoHash = params.originLocationGeoHash;
  let destCityGeoHash = params.destinationLocationGeoHash;
  let travelDate = params.departureDate;
  
  delete params.originLocationGeoHash;
  delete params.destinationLocationGeoHash;
  delete params.departureDate;
  delete params._csrf;

  busbud.search(sourceCityGeoHash, destCityGeoHash, travelDate, params).then(function(search_data) {
    let parsedData = parseDepartures(search_data);
    res.render("index", { data: parsedData, csrfToken: req.csrfToken() });
  }).catch(function(error) {
    res.render("index", { csrfToken: req.csrfToken() });
  });
});

module.exports = router;
