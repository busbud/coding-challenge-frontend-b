var express = require('express');
var get_departures = require('../service_calls/get_departures');
var router = express.Router();

/* GET users listing. */
router.get('/departures', function(req, res, next) {
    get_departures(function(departures) {
        res.json({
            departures: departures
        });
    });
});

module.exports = router;
