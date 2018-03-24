var express = require("express");
var router = express.Router();
var busbud = require("../lib/busbud");

router.get("/", function(req, res, next) {
  let sourceCityGeoHash = 'dr5reg';
  let destCityGeoHash = 'f25dvk';
  let travelDate = '2018-08-02';
  let options = {
    adult: 1
  };

  busbud.search(sourceCityGeoHash, destCityGeoHash, travelDate, options).then(function(search_data) {
    res.render("index", { data: JSON.stringify(search_data, null, 2), csrfToken: req.csrfToken() });
  });
});

module.exports = router;
