var express = require("express");
var router = express.Router();
var busbud = require("../lib/busbud");

/* GET home page. */
router.get("/", function(req, res, next) {
  let search_data = busbud.search("dr5reg", "f25dvk", "2018-08-02");
  res.render("index", { data: search_data });
});

module.exports = router;
