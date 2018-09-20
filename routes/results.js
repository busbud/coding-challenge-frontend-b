var express = require('express');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var dateFormat = require('dateformat');
var cities = {
  "New York": "dr5reg",
  "Montreal": "f25dvk",
  "Toronto": "dpz88g",
  "Vancouver": "c2b2nm",
  "Ottawa": "f244m6",
  "Tadoussac": "f2w3vt",
  "Quebec": "f2m673",
  "Calgary": "c3nf7v",
  "Red Deer": "c3r166"
};
var numResults = 0;



/* GET results page. */
router.get('/', function(req, res, next) {
  res.cookie('locale', req.params.locale);
  // Params
  origin = req.query.origin;
  destination = req.query.destination;
  departure = req.query.departure;
  passengers = req.query.passengers;
  language = req.i18n_lang;

  var results = {
    departure: [],
    arrival: [],
    diffDays: [],
    diffTime: [],
    origin: [],
    destination: [],
    price: [],
    currency: []
  };

  search(req.query, res, language, results);

});

function search(params, res, language, results) {
  var originCode = cities [params.origin];
  var destinationCode = cities [params.destination];
  var date = params.departure.split("-").reverse().join("-");

  var passengers = parseInt(params.adults) + parseInt(params.children) + parseInt(params.seniors);

  var url = "https://napi.busbud.com/x-departures/" + originCode + "/" + destinationCode + "/" + date + "/poll";
  var urlParams = queryParams(params, numResults, language);

  // Call busbud api
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url+"?"+ urlParams);
  xhr.setRequestHeader( 'Content-Type',   'application/json' );
  xhr.setRequestHeader( 'Accept', 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/' );
  xhr.setRequestHeader("X-Busbud-Token", process.env.X_BUSBUD_TOKEN);
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || xhr.status === 304) {
        var response = JSON.parse(xhr.responseText);
        //Provide client side "results"
        response.departures.forEach(function(item_specific) {
          results = addResults(results, item_specific, response);
        });
        if(response.complete){
          res.render('results', {
            title: "Busbud-Results",
            results: results,
            origin: params.origin,
            destination: params.destination,
            date: params.departure,
            passengers: passengers
          });
        }else{
          numResults = results.price.length;
          search(params, res, language, results);
        }
      }
    }

  };

}

// Querystring parameters (passangers and poll)
function queryParams(params, num, language){
  var adults = parseInt(params.adults)
  var children = parseInt(params.children);
  var seniors = parseInt(params.seniors);
  var queryAges = "";

  // Must provide the server with the age of the customers. To simplify,
  // the children and seniors age has been 6 and 65.
  if (children > 0){
    queryAges += "&child_ages=" + Array(children).fill(6).join(",");
  };
  if (seniors > 0){
    queryAges += "&senior_ages=" + Array(seniors).fill(65).join(",");
  };
  return "lang=" + language + "&index=" + num + "&adult=" + adults + "&child=" + children + "&senior=" + seniors + queryAges;
}


// Function add result element into array
function addResults(results, item_specific, response){
  //Departure time
  var departure = dateFormat(item_specific.departure_time, "UTC:hh:MM  TT");
  results.departure.push(departure);

  // Arrival time
  var arrival = dateFormat(item_specific.arrival_time, "UTC:hh:MM  TT");
  results.arrival.push(arrival);

  // Days difference
  var date1 = new Date(dateFormat(item_specific.departure_time,"yyyy-mm-dd"));
  var date2 = new Date(dateFormat(item_specific.arrival_time,"yyyy-mm-dd"));
  var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));
  results.diffDays.push(diffDays > 0 ? "+" + diffDays : "");

  //Duration trip
  var time1 = new Date(item_specific.departure_time);
  var time2 = new Date(item_specific.arrival_time);
  var diffHour = parseInt((time2 - time1) / (1000 * 60 * 60)) ;
  var diffMin = ((parseInt((time2 - time1) / (1000 * 60))) - diffHour * 60 );
  var diffTime = diffHour + "h " + diffMin + "m";
  results.diffTime.push(diffTime);

  //Name origin and destination (using service id location)
  var origin = "undefined";
  var destination = "undefined";
  response.locations.forEach(function(item_generic) {
    if (item_generic.id == item_specific.origin_location_id){
      origin = item_generic.name
    }
    if (item_generic.id == item_specific.destination_location_id){
      destination = item_generic.name
    }
  });
  results.origin.push(origin);
  results.destination.push(destination);

  //Price
  price = item_specific.prices.total / 100;
  results.price.push(price);

  //Currency
  currency = item_specific.prices.currency
  results.currency.push(currency);
  return results;
}

module.exports = router;
