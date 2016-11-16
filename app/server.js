var express = require('express');
var app = express();
import {
    fetchDeparture,
    pollDeparture
} from 'serverDepartureAPI.js';

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/'));
//app.use(express.static(__dirname + '/dist'));

// set the home page route
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/x-departures/:origin/:destination/:date}', function(req, res) {
    fetchDeparture(req.origin, req.destination, req.date, req.query).then((result) => res.send(result));
});

app.get('/x-departures/:origin/:destination/:date/poll}', function(req, res) {
    pollDeparture(req.origin, req.destination, req.date, req.query).then((result) => res.send(result));
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
