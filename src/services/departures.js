angular.module("busbud.svc.departures", [])
    .service("departures", function($http, $q, $timeout) {
        var _this = this;
        var apiUrl = "https://napi.busbud.com/x-departures";
        var requestHeaders = {
            "accept": "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
            "x-busbud-token": "PARTNER_JSWsVZQcS_KzxNRzGtIt1A"
        };
        var POLL_WAITING_DURATION = 2000;

        _this.getFormattedTrip = function(tripQuery) {
            return $q(function(resolve, reject) {
                pollDepartures(tripQuery)
                    .then(sortByDate)
                    .then(formatDates)
                    .then(setOperatorsById)
                    .then(setLocationsById)
                    .then(resolve)
                    .catch(reject);
            });
        };

        var pollDepartures = function(query, trip) {
            return $q(function(resolve, reject) {
                var url = apiUrl + "/" + [query.from, query.to, query.when].join("/") + "?adult=1&lang=" + moment.locale().split("-")[0];
                if (query.index) {
                    url += "&index=" + query.index;
                }
                $http.get(url,
                    {
                        headers: requestHeaders,
                        loadingElement: document.body
                    })
                    .then(function(res) {
                        if (!trip) {
                            trip = res.data;
                        } else {
                            trip.departures = trip.departures.concat(res.data.departures);
                        }
                        if (res.data.complete) {
                            resolve(trip);
                        } else {
                            $timeout(function() {
                                query.index = trip.departures.length;
                                pollDepartures(query, trip)
                                    .then(resolve)
                                    .catch(reject);
                            }, POLL_WAITING_DURATION);
                        }
                    })
                    .catch(reject);
            });
        };

        var sortByDate = function(trip) {
            if(!trip.departures) {
                return trip;
            }
            trip.departures.sort(function(dep1, dep2) {
                if (dep1.departure_time > dep2.departure_time) {
                    return 1;
                } else if (dep1.departure_time < dep2.departure_time) {
                    return -1;
                }
                return 0;
            });
            return trip;
        };

        var setOperatorsById = function(trip) {
            if(!trip.operators) {
                return trip;
            }
            var operators = {};
            for (var i = 0; i < trip.operators.length; i++) {
                operators[trip.operators[i].id] = trip.operators[i];
            }
            trip.operators_by_id = operators;
            return trip;
        };

        var setLocationsById = function(trip) {
            if(!trip.locations) {
                return trip;
            }
            var locations = {};
            for (var i = 0; i < trip.locations.length; i++) {
                locations[trip.locations[i].id] = trip.locations[i];
            }
            trip.locations_by_id = locations;
            return trip;
        };

        var formatDates = function(trip) {
            if(!trip.departures) {
                return trip;
            }
            var departure;
            for (var i = 0; i < trip.departures.length; i++) {
                departure = trip.departures[i];
                departure.formatted_dates = {
                    duration: moment.utc(departure.duration*60*1000).format("HH:mm"),
                    departure_time: moment(departure.departure_time).format("LT")
                };
                //arrival date is different from departure, add date to formatted values
                if (departure.departure_time.split("T")[0] !== departure.arrival_time.split("T")[0]) {
                    departure.formatted_dates.arrival_time = moment(departure.arrival_time).format("LT") + " (" + moment(departure.arrival_time).format("l") + ")";
                } else {
                    departure.formatted_dates.arrival_time = moment(departure.arrival_time).format("LT")
                }
            }
            return trip;
        };
    });
