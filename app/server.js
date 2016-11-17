var express = require('express');
var app = express();
var api = require('./serverDepartureAPI.js');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/dist'));

// set the home page route
app.get('/', function(req, res) {
    res.render('./public/index');
});

app.get('/x-departures/:origin/:destination/:date', function(req, res) {
    api.fetchDeparture(req.params.origin, req.params.destination, req.params.date, req.query).then(response => {
        return response.json();
    }).then(json => {
        res.send(json);
    });
});

app.get('/x-departures/:origin/:destination/:date/poll', function(req, res) {
    api.pollDeparture(req.params.origin, req.params.destination, req.params.date, req.query).then(response => {
        return response.json();
    }).then(json => {
        res.send(json);
    });
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
