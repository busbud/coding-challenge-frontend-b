var express = require("express");
var router = express.Router();
var busbud = require("../lib/busbud");

router.post("/", function(req, res, next) {
  let sourceCityGeoHash = req.param('originLocationGeoHash', 'dr5reg');
  let destCityGeoHash = req.param('destinationLocationGeoHash', 'f25dvk');
  let travelDate = req.param('departureDate', '2018-08-02');
  let options = {
    adult: 1
  };

  busbud.search(sourceCityGeoHash, destCityGeoHash, travelDate, options).then(function(search_data) {
    let parsedData = busbud.parseDepartures(search_data);
    res.render("index", { data: parsedData, csrfToken: req.csrfToken() });
  }).catch(function(error) {
    res.render("index", { csrfToken: req.csrfToken() });
  });
});

module.exports = router;
