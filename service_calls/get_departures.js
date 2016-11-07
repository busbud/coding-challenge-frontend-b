'use strict';

var https = require('https');
var moment = require('moment');

var origin = "dr5reg";
var destination = "f25dvk";
var outbound_date = "2017-08-04";

// Generic helper function for sending HTTP requests
function send_request(request_path, callback) {
    https.get({
        protocol: 'https:',
        hostname: 'napi.busbud.com',
        path: request_path,
        headers: {
            Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
            'x-busbud-token': 'GUEST_D0uRsbd4Ttegerg9J2V3Sw'
        }
    }, function(res) {
        var chunks = [];
        res.on('data', function(chunk) {
            chunks.push(chunk);
        }).on('end', function() {
            var buffer = Buffer.concat(chunks);
            var json = buffer.toString('utf-8');
            var data = JSON.parse(json);

            callback(data);
        });
    });
}

// Constructor to create a call and keep track of its state
// a single "call" spans multiple HTTP requests - the initial
// request and the subsequent polls until the request is `complete`
function GetDeparturesCall(callback) {
    this.results = {};
    this.locations = {};
    this.callback = callback;
}

// I personally prefer parasitic inheritance and using a `self` variable over prototypal inheritance
// but it can have a higher memory footprint than prototypal inheritance.
GetDeparturesCall.prototype = {
    send_initial_request: function() {
        console.log("get_departures sending initial request");

        send_request(
            `/x-departures/${origin}/${destination}/${outbound_date}?adult=1&child=0&senior=0&lang=CA&currency=CAD`,
            on_response.bind(this) // wouldn't need the `bind` call with a `self` variable, but AirBnb style guide
                                   // advises against `self` variables so I've been avoiding them
        );

        function on_response(data) {
            this.locations = data.locations.reduce(function(locations, location) {
                locations[location.id] = location;
                return locations;
            }, {})

            this.receive_data(data);
        }
    },
    // The `receive_data(...)` method handles any response from either an initial HTTP request or a poll,
    // consuming it's data and checking if we're complete or need to send a subsequent poll request
    receive_data: function(data) {
        console.log("get_departures receiving data");
        var locations = this.locations;
        (data.departures || []).reduce(function(result, departure) {
            var departure_location = locations[departure.origin_location_id];
            var arrival_location = locations[departure.destination_location_id];

            // only push an object with what we need. There's a lot of unnecessary
            // data in the napi response which is out of scope for this micro app

            // wtf sometimes there are duplicates?
            result[departure.id] = result[departure.id] || {
                id: departure.id,
                departure_datetime: departure.departure_time, // leave it as-is - ISO formatted, local time
                departure_timezone: departure.departure_timezone, // unused
                departure_location: {
                    name: departure_location.name,
                    // the response includes the lat/long so I decided to use them to make google maps links
                    google_maps: (typeof departure_location.lat === 'number' && typeof departure_location.lon === 'number') ?
                                 `http://www.google.com/maps/place/${departure_location.lat},${departure_location.lon}` : false
                },
                arrival_datetime: departure.arrival_time,
                arrival_timezone: departure.arrival_timezone,
                arrival_location: {
                    name: arrival_location.name,
                    // the response includes the lat/long so I decided to use them to make google maps links
                    google_maps: (typeof arrival_location.lat === 'number' && typeof arrival_location.lon === 'number') ?
                                 `http://www.google.com/maps/place/${arrival_location.lat},${arrival_location.lon}` : false
                },
                prices_total: departure.prices.total,
                destination_location_id: departure.destination_location_id,
                origin_location_id: departure.origin_location_id,
                links: departure.links
            };
            return result;
        }, this.results);

        if(data.complete) {
            let results = this.results; 
            this.callback(Object.keys(results).map(function(key) {
                return results[key];
            }));
        } else {
            setTimeout(this.send_poll_request.bind(this), data.ttl);
        }
    },
    send_poll_request: function() {
        var index = (!!this.departures ? this.departures.length : 0);
        send_request(
            `/x-departures/${origin}/${destination}/${outbound_date}/poll?adult=1&child=0&senior=0&lang=CA&currency=CAD&index=${index}`,
            this.receive_data.bind(this)
        );
    }
};


module.exports = function(callback) {
    var call = new GetDeparturesCall(callback);
    call.send_initial_request();
};
