var express = require("express");
var router = express.Router();
var busbud = require("../lib/busbud");

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
    let parsedData = busbud.parseDepartures(search_data);
    res.render("index", { data: parsedData, csrfToken: req.csrfToken() });
  }).catch(function(error) {
    res.render("index", { csrfToken: req.csrfToken() });
  });
});

module.exports = router;
