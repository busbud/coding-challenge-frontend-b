var axios = require("axios");
var moment = require("moment-timezone");
var accounting = require("accounting");

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
    price: accounting.formatMoney(departure.prices.total / 100),
    departTime: destinationTime,
    arriveTime: originTime,
    originLocationName: originLocation.name,
    destinationLocationName: destinationLocation.name
  };
};

function fetchData(source, destination, date, params, poll = false) {
  let gatheredData = { locations: [], departures: [] };
  return new Promise(function(resolve, reject) {
    let requestUrl = "/" + source + "/" + destination + "/" + date + (poll ? "/poll" : "");
    console.log('Sending request: ', requestUrl, ' with params', params);
    busbud.get(requestUrl, params).then(function(response) {
      console.log('Got response - Departure count: ', response.data.departures.length, ', complete?: ', response.data.complete);
      gatheredData.locations = response.data.locations;
      gatheredData.departures = response.data.departures;
      
      if (response.data.complete === false) {
        params.index = gatheredData.departures.length;
        setTimeout(() => {
          fetchData(source, destination, date, params, true).then(data => {
            gatheredData.locations = gatheredData.locations.concat(data.locations);
            gatheredData.departures = gatheredData.departures.concat(data.departures);

            gatheredData.locations = Array.from(new Set(gatheredData.locations));
            gatheredData.departures = Array.from(new Set(gatheredData.departures));

            resolve(gatheredData);
          }).catch(error => {
            reject(error);
          });
        }, 2000);
      } else {
        resolve(gatheredData);
      }
    }).catch(function(error) {
      reject(error);
    });
  });
}

busbud.search = function(source, destination, date, options = {}) {
  let params = {
    adult: 1,
    child: 0,
    senior: 0,
    lang: "CA",
    currency: "CAD"
  };

  params = Object.assign(params, options);
  return fetchData(source, destination, date, params);
};

busbud.parseDepartures = function(results) {
  return results.departures.map(departure => parseDeparture(departure, results.locations));
};

module.exports = busbud;
