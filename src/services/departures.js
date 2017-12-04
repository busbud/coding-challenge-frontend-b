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
                var url = apiUrl + "/" + [query.from, query.to, query.when].join("/") + "?lang=" + moment.locale().split("-")[0];
                if (query.index) {
                    url += "&index=" + query.index;
                }
               /* resolve(
                    {
                        "origin_city_id": "375dd587-9001-acbd-84a4-683deda84183",
                        "destination_city_id": "375dd587-9001-acbd-84a4-683dedfb933e",
                        "cities": [{
                            "id": "375dd587-9001-acbd-84a4-683deda84183",
                            "region_id": 6417,
                            "name": "New York City",
                            "lat": 40.71427,
                            "lon": -74.00597,
                            "geohash": "dr5reg",
                            "timezone": "America/New_York",
                            "image_url": "https://busbud.imgix.net/city-hires/1474307214322-NewYork,NewYork,UnitedStates.jpg?h={height}&w={width}&auto=format,compress",
                            "hero_image_url": "https://busbud.imgix.net/city-heroes/newyork.jpg?h={height}&w={width}&auto=format",
                            "legacy_url_form": "NewYork,NewYork,UnitedStates",
                            "country_code2": "US",
                            "full_name": "New York City, New York, États-Unis",
                            "locale": "fr",
                            "region": {
                                "id": 6417,
                                "region_code": "NY",
                                "country_code2": "US",
                                "name": "New York",
                                "locale": "fr",
                                "country": {
                                    "code2": "US",
                                    "code3": "USA",
                                    "name": "États-Unis",
                                    "continent": "NA",
                                    "default_locale": "en",
                                    "default_currency": "USD",
                                    "population": 310232863,
                                    "locale": "fr"
                                }
                            }
                        }, {
                            "id": "375dd587-9001-acbd-84a4-683dedfb933e",
                            "region_id": 3361,
                            "name": "Montréal",
                            "lat": 45.50884,
                            "lon": -73.58781,
                            "geohash": "f25dvk",
                            "timezone": "America/Montreal",
                            "image_url": "https://busbud.imgix.net/city-hires/1474307214311-Montreal,Quebec,Canada.jpg?h={height}&w={width}&auto=format,compress",
                            "hero_image_url": "https://busbud.imgix.net/city-heroes/montreal.jpg?h={height}&w={width}&auto=format",
                            "legacy_url_form": "Montreal,Quebec,Canada",
                            "country_code2": "CA",
                            "full_name": "Montréal, Québec, Canada",
                            "locale": "fr",
                            "region": {
                                "id": 3361,
                                "region_code": "QC",
                                "country_code2": "CA",
                                "name": "Québec",
                                "locale": "fr",
                                "country": {
                                    "code2": "CA",
                                    "code3": "CAN",
                                    "name": "Canada",
                                    "continent": "NA",
                                    "default_locale": "en",
                                    "default_currency": "CAD",
                                    "population": 33679000,
                                    "locale": "fr"
                                }
                            }
                        }],
                        "locations": [{
                            "id": 5178,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "New York City",
                            "address": [],
                            "type": "other",
                            "lat": null,
                            "lon": null,
                            "geohash": null
                        }, {
                            "id": 4744,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "122 Allen St. at Delancy",
                            "address": ["122 Allen St", "New York, NY 10002-3004"],
                            "type": "bus_stop",
                            "lat": 40.719562,
                            "lon": -73.98986,
                            "geohash": "dr5rskf0x"
                        }, {
                            "id": 17529,
                            "city_id": "375dd587-9001-acbd-84a4-683dedfb933e",
                            "name": "Aéroport YUL Trudeau",
                            "address": ["Aéroport Montréal-Trudeau, H4Y 1H1, Dorval, Québec"],
                            "type": "airport",
                            "lat": 45.45764,
                            "lon": -73.7497,
                            "geohash": "f25d9g31g"
                        }, {
                            "id": 6933,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "31st St & 8th Ave",
                            "address": ["349 W 31st St (between 8th & 9th Avenue)", "New York, NY 10001"],
                            "type": "bus_stop",
                            "lat": 40.750996,
                            "lon": -73.996178,
                            "geohash": "dr5ru4mxu"
                        }, {
                            "id": 4745,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "Bedford Ave & Sullivan Pl",
                            "address": ["1727 Bedford Ave", "Brooklyn, NY 11225", "USA"],
                            "type": "bus_stop",
                            "lat": 40.664089,
                            "lon": -73.95694,
                            "geohash": "dr5rm4djq"
                        }, {
                            "id": 1942,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "Port Authority Bus Terminal",
                            "address": ["619-623 8th Ave", "New York, NY 10018", "USA"],
                            "type": "bus_station",
                            "lat": 40.756252,
                            "lon": -73.990684,
                            "geohash": "dr5ru73wk"
                        }, {
                            "id": 14062,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "Broadway & Chambers St",
                            "address": ["280 Broadway", "New York", "NY 10007", "USA"],
                            "type": "bus_stop",
                            "lat": 40.7142981,
                            "lon": -74.0058132,
                            "geohash": "dr5regy9g"
                        }, {
                            "id": 5160,
                            "city_id": "375dd587-9001-acbd-84a4-683dedfb933e",
                            "name": "Gare D'Autocars de Montréal",
                            "address": ["1717 Rue Berri", "Montreal, QC H2L 4E9"],
                            "type": "bus_station",
                            "lat": 45.516235,
                            "lon": -73.562668,
                            "geohash": "f25dyjcr3"
                        }, {
                            "id": 4051,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "Broadway & Reade",
                            "address": ["280 Broadway", "New York", "NY 10007", "USA"],
                            "type": "bus_stop",
                            "lat": 40.7147985880596,
                            "lon": -74.0058841693115,
                            "geohash": "dr5regysc"
                        }, {
                            "id": 12984,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "31st St & 8th Ave",
                            "address": ["314 West 31st St (between 8th & 9th Ave, On the south side of the Post Office building across the street from TCI - Collage of Technology)", "New York, NY 10001"],
                            "type": "bus_stop",
                            "lat": 40.7506869434311,
                            "lon": -73.9957040548325,
                            "geohash": "dr5ru4mvz"
                        }, {
                            "id": 9851,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "31st St & 8th Ave",
                            "address": ["313 W 31 St New York, NY 10001", "Between 8th and 9th Ave on same side of the street as the post office."],
                            "type": "bus_stop",
                            "lat": 40.7502839,
                            "lon": -73.9948484,
                            "geohash": "dr5ru4qee"
                        }, {
                            "id": 4748,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "36th St & 7th Ave",
                            "address": ["202 West 36th St.", "(cor. 7th Ave)", "New York, New York"],
                            "type": "bus_stop",
                            "lat": 40.75237,
                            "lon": -73.99015,
                            "geohash": "dr5ru6dpb"
                        }, {
                            "id": 37625,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "Port Authority Bus Terminal",
                            "address": ["Gate 23", "641 8th Ave", "New York", "NY 10036, USA"],
                            "type": "bus_stop",
                            "lat": 40.756872,
                            "lon": -73.991946,
                            "geohash": "dr5ru789y"
                        }, {
                            "id": 37627,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "Port Authority Bus Terminal",
                            "address": ["Gate 31", "641 8th Ave", "New York", "NY 10036, USA"],
                            "type": "bus_stop",
                            "lat": 40.756872,
                            "lon": -73.991946,
                            "geohash": "dr5ru789y"
                        }, {
                            "id": 18366,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "42nd St & 7th Ave",
                            "address": ["209 W 42nd St", "In front of Sketchers", "New York", "NY 10036", "USA"],
                            "type": "bus_stop",
                            "lat": 40.7562621547586,
                            "lon": -73.9877307184547,
                            "geohash": "dr5ru77y2"
                        }, {
                            "id": 18367,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "33rd St & 7th Ave",
                            "address": ["430 7th Avenue, ", "New York, NY, ", "United States"],
                            "type": "bus_stop",
                            "lat": 40.7511221173376,
                            "lon": -73.9911116871025,
                            "geohash": "dr5ru6926"
                        }, {
                            "id": 12166,
                            "city_id": "375dd587-9001-acbd-84a4-683dedfb933e",
                            "name": "Métro Radisson",
                            "address": ["7155 Rue Sherbrooke E, quai 5", "Montréal, QC H1N"],
                            "type": "subway_station",
                            "lat": 45.58889,
                            "lon": -73.53987,
                            "geohash": "f25eqe1ys"
                        }, {
                            "id": 35409,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "51 Madison Ave",
                            "address": ["51 Madison Ave", "New York", "NY 10010, USA"],
                            "type": "bus_stop",
                            "lat": 40.7430573,
                            "lon": -73.98617,
                            "geohash": "dr5ru3hct"
                        }, {
                            "id": 17530,
                            "city_id": "375dd587-9001-acbd-84a4-683dedfb933e",
                            "name": "Boulevard René-Lévesque",
                            "address": ["200 Boulevard René-Lévesque O", "Montréal", "QC H2Z 1X4", "Canada"],
                            "type": "bus_stop",
                            "lat": 45.507147,
                            "lon": -73.56292,
                            "geohash": "f25dyh347"
                        }, {
                            "id": 3970,
                            "city_id": "375dd587-9001-acbd-84a4-683dedfb933e",
                            "name": "Place Bonaventure",
                            "address": ["Place Bonaventure", "Montréal, QC", "Canada"],
                            "type": "transit_station",
                            "lat": 45.4988273060484,
                            "lon": -73.5644745826722,
                            "geohash": "f25dvfzcz"
                        }, {
                            "id": 24134,
                            "city_id": "375dd587-9001-acbd-84a4-683dedfb933e",
                            "name": "Montréal (800 de la Gauchetière)",
                            "address": ["1105 Boulevard Robert-Bourassa", "Montréal, QC H3B 2M1", "Canada"],
                            "type": "bus_stop",
                            "lat": 45.501918,
                            "lon": -73.566921,
                            "geohash": "f25dvgq5y"
                        }, {
                            "id": 24108,
                            "city_id": "375dd587-9001-acbd-84a4-683dedfb933e",
                            "name": "René-Lévesque & Jeanne-Mance",
                            "address": ["220 Boulevard René-Lévesque O", "Montréal", "QC H5B, Canada"],
                            "type": "bus_stop",
                            "lat": 45.5063360495651,
                            "lon": -73.5635840171967,
                            "geohash": "f25dyh0ts"
                        }, {
                            "id": 11778,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "30th St & 9th Ave",
                            "address": ["30th Street and 9th Avenue, ", "New York, ", "NY 10001"],
                            "type": "bus_stop",
                            "lat": 40.7510486253891,
                            "lon": -73.9984653890133,
                            "geohash": "dr5ru4ebn"
                        }, {
                            "id": 32205,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "Union City, NJ",
                            "address": ["508-510 31st St", "Union City", "NJ 07087, USA"],
                            "type": "bus_stop",
                            "lat": 40.771866,
                            "lon": -74.030216,
                            "geohash": "dr5rgqkc6"
                        }, {
                            "id": 23185,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "31st St & 8th Ave",
                            "address": ["314 W 31st St", "New York", "NY 10001, USA"],
                            "type": "bus_stop",
                            "lat": 40.750608,
                            "lon": -73.995696,
                            "geohash": "dr5ru4mvr"
                        }, {
                            "id": 12186,
                            "city_id": "375dd587-9001-acbd-84a4-683dedfb933e",
                            "name": "Aéroport YUL Trudeau",
                            "address": ["Roméo-Vachon Blvd North (Departures)", "Dorval, QC H4Y 1G8", "Canada"],
                            "type": "airport",
                            "lat": 45.4576547718173,
                            "lon": -73.7496221065521,
                            "geohash": "f25d9g34j"
                        }, {
                            "id": 25180,
                            "city_id": "375dd587-9001-acbd-84a4-683dedfb933e",
                            "name": "Station Crémazie",
                            "address": ["401 Rue Berri", "Montréal, QC H2M", "Canada"],
                            "type": "bus_stop",
                            "lat": 45.5456615477858,
                            "lon": -73.6389907876969,
                            "geohash": "f25eh73dx"
                        }, {
                            "id": 17505,
                            "city_id": "375dd587-9001-acbd-84a4-683dedfb933e",
                            "name": "Gare Centrale",
                            "address": ["895 Rue de la Gauchetière O", "Montréal", "QC H3B 4G1, Canada"],
                            "type": "bus_station",
                            "lat": 45.499918,
                            "lon": -73.566459,
                            "geohash": "f25dvgn81"
                        }, {
                            "id": 17525,
                            "city_id": "375dd587-9001-acbd-84a4-683dedfb933e",
                            "name": "Jean-Talon & St-Denis",
                            "address": ["7160 Rue Saint-Denis", "Montréal, QC H2R 2E2", "Canada"],
                            "type": "bus_stop",
                            "lat": 45.5382699406975,
                            "lon": -73.6146678134918,
                            "geohash": "f25ehcgrt"
                        }, {
                            "id": 1938,
                            "city_id": "375dd587-9001-acbd-84a4-683dedfb933e",
                            "name": "Gare d'autocars de Montréal",
                            "address": ["1717 Rue Berri", "Montréal, QC H2L 4E9", "Canada"],
                            "type": "bus_station",
                            "lat": 45.516235,
                            "lon": -73.562668,
                            "geohash": "f25dyjcr3"
                        }, {
                            "id": 16667,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "39th St & 1st Ave",
                            "address": ["672 1st Avenue New York, ", "NY 10016", "USA"],
                            "type": "bus_stop",
                            "lat": 40.7465781,
                            "lon": -73.9714893,
                            "geohash": "dr5ru9xw5"
                        }, {
                            "id": 24010,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "34th St & 9th Ave",
                            "address": ["367 W 34th St", "New York", "NY 10001, USA"],
                            "type": "bus_stop",
                            "lat": 40.7533974783186,
                            "lon": -73.9958676695824,
                            "geohash": "dr5ru4vve"
                        }, {
                            "id": 16666,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "Canal St & 6th Ave",
                            "address": ["101 6th Ave  (between Grand and Watts Streets)", " New York", "NY 10014", "USA"],
                            "type": "bus_stop",
                            "lat": 40.7233797,
                            "lon": -74.0054228,
                            "geohash": "dr5revqyu"
                        }, {
                            "id": 5181,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "42nd St & 7th Ave",
                            "address": ["209 West 42nd St between 7th and 8th avenues (In front of Skechers)"],
                            "type": "other",
                            "lat": 40.7565583,
                            "lon": -73.9875219,
                            "geohash": "dr5ru7ebj"
                        }, {
                            "id": 3886,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "39th St & 8th Ave",
                            "address": ["616 8th Avenue", "Manhattan, NY 10036", "(It is right by the​ Hummus & Pita Co. restaurant and across the street from the Chase bank)"],
                            "type": "bus_stop",
                            "lat": 40.755657,
                            "lon": -73.990731,
                            "geohash": "dr5ru73dg"
                        }, {
                            "id": 18368,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "31st St & 5th Ave",
                            "address": ["West 31th Street and 5th Avenue, ", "New York, NY,", "United States"],
                            "type": "bus_stop",
                            "lat": 40.7466500468169,
                            "lon": -73.9861700423626,
                            "geohash": "dr5ru3sym"
                        }, {
                            "id": 26613,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "26th St & Park Ave",
                            "address": ["372 Park Ave S", "New York", "NY 10010, USA"],
                            "type": "bus_stop",
                            "lat": 40.7424611956732,
                            "lon": -73.9848384261131,
                            "geohash": "dr5ru2vyh"
                        }, {
                            "id": 4750,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "36th St & 7th Ave",
                            "address": ["202 W 36th St cor. 7th Ave", "New York, NY 10018-7748"],
                            "type": "bus_stop",
                            "lat": 40.752232,
                            "lon": -73.989944,
                            "geohash": "dr5ru6dnv"
                        }, {
                            "id": 17508,
                            "city_id": "375dd587-9001-acbd-84a4-683dedfb933e",
                            "name": "Saint-Denis & Saint-Joseph",
                            "address": ["389 Boulevard Saint-Joseph Est", "Montréal, QC H2T 1J5", "Canada"],
                            "type": "bus_stop",
                            "lat": 45.5262379894414,
                            "lon": -73.5881536441803,
                            "geohash": "f25dvry9x"
                        }, {
                            "id": 25179,
                            "city_id": "375dd587-9001-acbd-84a4-683dedfb933e",
                            "name": "Métro Radisson",
                            "address": ["7200 Rue Sherbrooke E", "Montréal, QC H1N 1E7", "Canada"],
                            "type": "bus_stop",
                            "lat": 45.5888,
                            "lon": -73.53948,
                            "geohash": "f25eqe4nj"
                        }, {
                            "id": 17511,
                            "city_id": "375dd587-9001-acbd-84a4-683dedfb933e",
                            "name": "René-Lévesque & Robert-Bourassa",
                            "address": ["645 Boulevard René-Lévesque O", "Montréal, QC H3B 1S5", "Canada"],
                            "type": "bus_stop",
                            "lat": 45.5021298156559,
                            "lon": -73.5673371779098,
                            "geohash": "f25dvgmvh"
                        }, {
                            "id": 24693,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "Port Authority Bus Terminal",
                            "address": ["Gate #27", "625 8th Ave", "New York", "NY 10109, USA"],
                            "type": "bus_stop",
                            "lat": 40.7571517,
                            "lon": -73.9908163,
                            "geohash": "dr5ru79e9"
                        }, {
                            "id": 28203,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "Port Authority Bus Terminal",
                            "address": ["Gate #23", "625 8th Ave", "New York", "NY 10018, USA"],
                            "type": "bus_stop",
                            "lat": 40.7569545,
                            "lon": -73.990494,
                            "geohash": "dr5ru79f2"
                        }, {
                            "id": 28204,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "Port Authority Bus Terminal",
                            "address": ["Gate #29", "625 8th Ave", "New York, NY 10018", "USA"],
                            "type": "bus_stop",
                            "lat": 40.7569545,
                            "lon": -73.990494,
                            "geohash": "dr5ru79f2"
                        }, {
                            "id": 24112,
                            "city_id": "375dd587-9001-acbd-84a4-683dedfb933e",
                            "name": "Robert-Bourassa & René-Lévesque",
                            "address": ["800 Boulevard Robert-Bourassa", "Montréal, QC H3B", "Canada"],
                            "type": "bus_stop",
                            "lat": 45.5019518197437,
                            "lon": -73.5671702027321,
                            "geohash": "f25dvgqh0"
                        }, {
                            "id": 33318,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "Port Authority Bus Terminal",
                            "address": ["Port Authority Bus Terminal, lower level, Gate #27", "301-327 W 41st St", "New York", "NY 10036, USA"],
                            "type": "bus_stop",
                            "lat": 40.756801,
                            "lon": -73.991357,
                            "geohash": "dr5ru791s"
                        }, {
                            "id": 16665,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "33rd St & 11th Ave",
                            "address": ["611 W. 33rd St", "New York", "NY 10001", "USA"],
                            "type": "bus_stop",
                            "lat": 40.7552933,
                            "lon": -74.0028935,
                            "geohash": "dr5ru528z"
                        }, {
                            "id": 29202,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "26th St & Park Ave",
                            "address": ["368 Park Ave S", "New York", "NY 10016", "USA"],
                            "type": "bus_stop",
                            "lat": 40.742203,
                            "lon": -73.984759,
                            "geohash": "dr5ru2vuw"
                        }, {
                            "id": 20971,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "36th St & 11th Ave",
                            "address": ["428-436 11th Ave", "New York, NY 10018", "USA"],
                            "type": "bus_stop",
                            "lat": 40.7568439,
                            "lon": -74.0012099,
                            "geohash": "dr5ru59cy"
                        }, {
                            "id": 5180,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "34th St & 7th Ave",
                            "address": ["430 7th Avenue between 33rd and 34th Streets, NYC (Penn Station - In front of the Modell's Sports, across from the Pennsylvania Hotel, 1 block from the New Yorker Hotel)"],
                            "type": "bus_stop",
                            "lat": 40.7508729,
                            "lon": -73.9909665,
                            "geohash": "dr5ru63rj"
                        }, {
                            "id": 3879,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "37th St & 7th Ave",
                            "address": ["201 West 37th St. (on West 37th St.)", "New York, NY 10001", "(Adjacent to Fed Ex. Within walking distance to various subway stations - A.C.E. IND Lines 1.2.3.7.IRT Lines)"],
                            "type": "bus_stop",
                            "lat": 40.7529192,
                            "lon": -73.9892624,
                            "geohash": "dr5ru6fdv"
                        }, {
                            "id": 35991,
                            "city_id": "375dd587-9001-acbd-84a4-683dedfb933e",
                            "name": "Aéroport YUL Trudeau",
                            "address": ["975 Roméo-Vachon Blvd North (bus & taxi loop)", "Dorval, QC H4Y", "Canada"],
                            "type": "bus_stop",
                            "lat": 45.4568721045985,
                            "lon": -73.7516283988953,
                            "geohash": "f25d9eptq"
                        }, {
                            "id": 36020,
                            "city_id": "375dd587-9001-acbd-84a4-683dedfb933e",
                            "name": "120 PLACE CHARLES LEMOYNE",
                            "address": [],
                            "type": "other",
                            "lat": 45.253,
                            "lon": -73.522,
                            "geohash": "f259qyncv"
                        }, {
                            "id": 36029,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "Clifton SIR Station",
                            "address": ["845-869 Bay St", "Staten Island", "NY 10304, USA"],
                            "type": "bus_stop",
                            "lat": 40.621349,
                            "lon": -74.07135,
                            "geohash": "dr5r46yus"
                        }, {
                            "id": 36102,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "George Washington Bridge Bus Station",
                            "address": ["4211 Broadway", "New York", "NY 10033", "USA"],
                            "type": "bus_stop",
                            "lat": 40.848852,
                            "lon": -73.938404,
                            "geohash": "dr72mkr9y"
                        }, {
                            "id": 36028,
                            "city_id": "375dd587-9001-acbd-84a4-683deda84183",
                            "name": "Brooklyn, 375 Hamilton Ave",
                            "address": ["375 Hamilton Ave", "Brooklyn", "NY 11231, USA"],
                            "type": "bus_stop",
                            "lat": 40.6730638,
                            "lon": -73.9988774,
                            "geohash": "dr5rkh79v"
                        }],
                        "operators": [{
                            "id": "0e753dbf-a9de-4339-8a00-bbb6f4813d18",
                            "source_id": 175,
                            "profile_id": 213,
                            "name": "Adirondack Trailways",
                            "url": "https://trailwaysny.com",
                            "logo_url": "https://busbud.imgix.net/operator-logos/adirondack-trailways.png?h={height}&w={width}&auto=format&fit=fill&bg=0FFF",
                            "display_name": "Adirondack Trailways",
                            "review_state": "good",
                            "sellable": true,
                            "fuzzy_prices": false,
                            "sell_tickets_cutoff": {"hours": 3},
                            "amenities": {
                                "classes": {
                                    "Economy": {
                                        "display_name": "-",
                                        "wifi": true,
                                        "toilet": true,
                                        "ac": true,
                                        "refreshment": false,
                                        "food": false,
                                        "hot_meal": false,
                                        "power_outlets": true,
                                        "tv": true,
                                        "bus_attendant": false,
                                        "leg_room": false,
                                        "small_seat": false,
                                        "average_seat": true,
                                        "xl_seat": false,
                                        "full_recline_seat": false
                                    },
                                    "Normal": {
                                        "display_name": "-",
                                        "wifi": true,
                                        "toilet": true,
                                        "ac": true,
                                        "refreshment": false,
                                        "food": false,
                                        "hot_meal": false,
                                        "power_outlets": true,
                                        "tv": true,
                                        "bus_attendant": false,
                                        "leg_room": false,
                                        "small_seat": false,
                                        "average_seat": true,
                                        "xl_seat": false,
                                        "full_recline_seat": false
                                    }
                                }
                            },
                            "source": "ny_trailways",
                            "referral_deal": false,
                            "display_url": "trailwaysny.com",
                            "fraud_check": null,
                            "terms": {
                                "type_of_id": "photo_and_full_name",
                                "ticket_requirements": {"print": "printed_tkt", "claim": "printed_tkt"},
                                "nb_carry_on": 1,
                                "kg_by_carry_on": null,
                                "nb_checked_bags": 2,
                                "kg_by_bag": 23,
                                "checked_in_size_cm": null,
                                "nb_extra_checked_in": null,
                                "extra_checked_in_fees": {"type": "per_extra_checked_in", "amount": 1500},
                                "oversized_luggage": {
                                    "allowed": true,
                                    "allowed_types": ["bicycle", "sport_equipment"],
                                    "fees": {"type": "flat_fee", "amount": 2000},
                                    "early_arrival_required": true,
                                    "cover_required": true
                                },
                                "animals": {
                                    "fees": {"type": "unknown", "amount": null, "percent": null},
                                    "main_compartment_allowed": false,
                                    "hold_compartment_allowed": false,
                                    "main_max_weight_kg": null,
                                    "main_small_cage_required": null,
                                    "hold_max_weight_kg": null,
                                    "vaccination_required": true,
                                    "special_animals_allowed": true,
                                    "early_arrival_required": true,
                                    "specific_hours": null
                                },
                                "refund_policies": [],
                                "exchange_policies": [{
                                    "type": "station",
                                    "flat_fee": 2000,
                                    "flat_fee_currency": "USD",
                                    "percent_fee": null,
                                    "cutoff_reference": "departure-date",
                                    "cutoff_from": null,
                                    "cutoff_to": 24,
                                    "external_link": null
                                }],
                                "refund": false,
                                "exchange": true,
                                "boarding_requirement": "printed_tkt",
                                "piece_of_id": true,
                                "bag_allowed": true,
                                "extra_bag_policy": true,
                                "extra_bag_cost": 1500,
                                "extra_bag_kg_cost": null,
                                "addons": {},
                                "refund_cutoff": null,
                                "exchange_cutoff": 24
                            }
                        }, {
                            "id": "bfc27cd5-44ca-49c1-8d00-0f2bc00c58c0",
                            "source_id": 155,
                            "profile_id": 580,
                            "name": "Greyhound",
                            "url": null,
                            "logo_url": "https://busbud.imgix.net/operator-logos/greyhound.png?h={height}&w={width}&auto=format&fit=fill&bg=0FFF",
                            "display_name": "Greyhound",
                            "review_state": "good",
                            "sellable": true,
                            "fuzzy_prices": false,
                            "sell_tickets_cutoff": {"hours": 1},
                            "amenities": {
                                "classes": {
                                    "Economy": {
                                        "display_name": "-",
                                        "wifi": true,
                                        "toilet": true,
                                        "ac": true,
                                        "refreshment": false,
                                        "food": false,
                                        "hot_meal": false,
                                        "power_outlets": true,
                                        "tv": false,
                                        "bus_attendant": false,
                                        "leg_room": false,
                                        "small_seat": false,
                                        "average_seat": true,
                                        "xl_seat": false,
                                        "full_recline_seat": false
                                    },
                                    "Normal": {
                                        "display_name": "-",
                                        "wifi": true,
                                        "toilet": true,
                                        "ac": true,
                                        "refreshment": false,
                                        "food": false,
                                        "hot_meal": false,
                                        "power_outlets": true,
                                        "tv": false,
                                        "bus_attendant": false,
                                        "leg_room": false,
                                        "small_seat": false,
                                        "average_seat": true,
                                        "xl_seat": false,
                                        "full_recline_seat": false
                                    }
                                }
                            },
                            "source": "greyhound_us",
                            "referral_deal": false,
                            "display_url": null,
                            "fraud_check": "iovation",
                            "terms": {
                                "type_of_id": "photo_and_full_name",
                                "ticket_requirements": {
                                    "print": "printed_tkt",
                                    "voucher": "printed_tkt",
                                    "claim": "printed_tkt"
                                },
                                "nb_carry_on": 1,
                                "kg_by_carry_on": 11,
                                "nb_checked_bags": 1,
                                "kg_by_bag": 23,
                                "checked_in_size_cm": null,
                                "extra_checked_in_fees": {"type": "per_extra_checked_in", "amount": 1500},
                                "oversized_luggage": {
                                    "allowed": true,
                                    "allowed_types": ["bicycle", "sport_equipment"],
                                    "fees": {"type": "as_additional_luggage", "amount": null},
                                    "early_arrival_required": true,
                                    "cover_required": true
                                },
                                "animals": {
                                    "fees": {"type": "unknown", "amount": null, "percent": null},
                                    "main_compartment_allowed": false,
                                    "hold_compartment_allowed": false,
                                    "main_max_weight_kg": null,
                                    "main_small_cage_required": null,
                                    "hold_max_weight_kg": null,
                                    "vaccination_required": true,
                                    "special_animals_allowed": true,
                                    "early_arrival_required": true,
                                    "specific_hours": null
                                },
                                "refund_policies": [],
                                "exchange_policies": [{
                                    "type": "station",
                                    "flat_fee": 2500,
                                    "flat_fee_currency": "USD",
                                    "percent_fee": null,
                                    "cutoff_reference": "departure-date",
                                    "cutoff_from": null,
                                    "cutoff_to": 1,
                                    "external_link": null
                                }],
                                "refund": false,
                                "exchange": true,
                                "boarding_requirement": "printed_tkt",
                                "piece_of_id": true,
                                "bag_allowed": true,
                                "extra_bag_policy": true,
                                "extra_bag_cost": 1500,
                                "extra_bag_kg_cost": null,
                                "addons": {},
                                "refund_cutoff": null,
                                "exchange_cutoff": 1
                            }
                        }],
                        "departures": [{
                            "amenities": {
                                "display_name": "-",
                                "wifi": true,
                                "toilet": true,
                                "ac": true,
                                "refreshment": false,
                                "food": false,
                                "hot_meal": false,
                                "power_outlets": true,
                                "tv": true,
                                "bus_attendant": false,
                                "leg_room": false,
                                "small_seat": false,
                                "average_seat": true,
                                "xl_seat": false,
                                "full_recline_seat": false
                            },
                            "arrival_timezone": "America/Montreal",
                            "available_seats": 50,
                            "bus": null,
                            "busbud_departure_id": "b750b2b0",
                            "class": "Economy",
                            "class_name": "-",
                            "deeplink": null,
                            "departure_timezone": "America/New_York",
                            "departure_type": null,
                            "destination_location_id": 1938,
                            "duration": 535,
                            "has_search_details": true,
                            "has_transfers": false,
                            "has_addons": null,
                            "id": "ZjI0OTZhMGI6Yjc1MGIyYjA",
                            "links": {"deeplink": "https://www.busbud.com/fr/deeplink/dr5reg/f25dvk/ZjI0OTZhMGI6Yjc1MGIyYjA?outbound_date=2018-08-02&return_date&adults=2&children=0&seniors=0&child_ages=&senior_ages=&discount_code&utm_source={utm_source}&utm_campaign={utm_campaign}&utm_medium={utm_medium}"},
                            "num_transfers": 0,
                            "operator_id": "0e753dbf-a9de-4339-8a00-bbb6f4813d18",
                            "origin_location_id": 1942,
                            "schedule_id": null,
                            "sellable": true,
                            "source_id": 175,
                            "ticket_types": ["print"],
                            "departure_time": "2018-08-02T11:00:00",
                            "arrival_time": "2018-08-02T19:55:00",
                            "fetched_at": "2017-12-02T12:58:37.014Z",
                            "prices": {
                                "currency": "EUR",
                                "total": 8963,
                                "categories": {},
                                "discount": 0,
                                "roundtrip_min": null,
                                "roundtrip_total": null,
                                "discounted": null,
                                "breakdown": {"base": 8963, "fees": 0, "taxes": 0, "discount": 0}
                            },
                            "trip_stops": null,
                            "addons": null,
                            "details": {},
                            "terms": {
                                "type_of_id": "photo_and_full_name",
                                "ticket_requirements": {"print": "printed_tkt", "claim": "printed_tkt"},
                                "nb_carry_on": 1,
                                "kg_by_carry_on": null,
                                "nb_checked_bags": 2,
                                "kg_by_bag": 23,
                                "checked_in_size_cm": null,
                                "extra_checked_in_fees": {"type": "per_extra_checked_in", "amount": 1500},
                                "nb_extra_checked_in": null,
                                "oversized_luggage": {
                                    "allowed": true,
                                    "allowed_types": ["bicycle", "sport_equipment"],
                                    "fees": {"type": "flat_fee", "amount": 2000},
                                    "early_arrival_required": true,
                                    "cover_required": true
                                },
                                "animals": {
                                    "fees": {"type": "unknown", "amount": null, "percent": null},
                                    "main_compartment_allowed": false,
                                    "hold_compartment_allowed": false,
                                    "main_max_weight_kg": null,
                                    "main_small_cage_required": null,
                                    "hold_max_weight_kg": null,
                                    "vaccination_required": true,
                                    "special_animals_allowed": true,
                                    "early_arrival_required": true,
                                    "specific_hours": null
                                },
                                "refund_policies": [{
                                    "type": "no-refund",
                                    "flat_fee": null,
                                    "flat_fee_currency": null,
                                    "percent_fee": null,
                                    "cutoff_reference": "departure-date",
                                    "cutoff_from": null,
                                    "cutoff_to": null,
                                    "external_link": null
                                }],
                                "refund": false,
                                "refund_cutoff": null,
                                "exchange_policies": [{
                                    "type": "station",
                                    "flat_fee": 2000,
                                    "flat_fee_currency": "USD",
                                    "percent_fee": null,
                                    "cutoff_reference": "departure-date",
                                    "cutoff_from": null,
                                    "cutoff_to": 24,
                                    "external_link": null
                                }],
                                "exchange": true,
                                "exchange_cutoff": 24,
                                "exchange_cutoff_at": "2018-08-01T15:00:00.000Z",
                                "currency": "USD",
                                "addons": {},
                                "piece_of_id": true,
                                "boarding_requirement": "printed_tkt",
                                "extra_bag_policy": true,
                                "extra_bag_cost": 1500,
                                "extra_bag_kg_cost": null,
                                "bag_allowed": true
                            }
                        }, {
                            "amenities": {
                                "display_name": "-",
                                "wifi": true,
                                "toilet": true,
                                "ac": true,
                                "refreshment": false,
                                "food": false,
                                "hot_meal": false,
                                "power_outlets": true,
                                "tv": true,
                                "bus_attendant": false,
                                "leg_room": false,
                                "small_seat": false,
                                "average_seat": true,
                                "xl_seat": false,
                                "full_recline_seat": false
                            },
                            "arrival_timezone": "America/Montreal",
                            "available_seats": 50,
                            "bus": null,
                            "busbud_departure_id": "5e9a1c11",
                            "class": "Economy",
                            "class_name": "-",
                            "deeplink": null,
                            "departure_timezone": "America/New_York",
                            "departure_type": null,
                            "destination_location_id": 1938,
                            "duration": 505,
                            "has_search_details": true,
                            "has_transfers": false,
                            "has_addons": null,
                            "id": "ZTc2YWIyYTY6NWU5YTFjMTE",
                            "links": {"deeplink": "https://www.busbud.com/fr/deeplink/dr5reg/f25dvk/ZTc2YWIyYTY6NWU5YTFjMTE?outbound_date=2018-08-02&return_date&adults=2&children=0&seniors=0&child_ages=&senior_ages=&discount_code&utm_source={utm_source}&utm_campaign={utm_campaign}&utm_medium={utm_medium}"},
                            "num_transfers": 0,
                            "operator_id": "0e753dbf-a9de-4339-8a00-bbb6f4813d18",
                            "origin_location_id": 1942,
                            "schedule_id": null,
                            "sellable": true,
                            "source_id": 175,
                            "ticket_types": ["print"],
                            "departure_time": "2018-08-02T18:30:00",
                            "arrival_time": "2018-08-03T02:55:00",
                            "fetched_at": "2017-12-02T12:58:37.014Z",
                            "prices": {
                                "currency": "EUR",
                                "total": 8963,
                                "categories": {},
                                "discount": 0,
                                "roundtrip_min": null,
                                "roundtrip_total": null,
                                "discounted": null,
                                "breakdown": {"base": 8963, "fees": 0, "taxes": 0, "discount": 0}
                            },
                            "trip_stops": null,
                            "addons": null,
                            "details": {},
                            "terms": {
                                "type_of_id": "photo_and_full_name",
                                "ticket_requirements": {"print": "printed_tkt", "claim": "printed_tkt"},
                                "nb_carry_on": 1,
                                "kg_by_carry_on": null,
                                "nb_checked_bags": 2,
                                "kg_by_bag": 23,
                                "checked_in_size_cm": null,
                                "extra_checked_in_fees": {"type": "per_extra_checked_in", "amount": 1500},
                                "nb_extra_checked_in": null,
                                "oversized_luggage": {
                                    "allowed": true,
                                    "allowed_types": ["bicycle", "sport_equipment"],
                                    "fees": {"type": "flat_fee", "amount": 2000},
                                    "early_arrival_required": true,
                                    "cover_required": true
                                },
                                "animals": {
                                    "fees": {"type": "unknown", "amount": null, "percent": null},
                                    "main_compartment_allowed": false,
                                    "hold_compartment_allowed": false,
                                    "main_max_weight_kg": null,
                                    "main_small_cage_required": null,
                                    "hold_max_weight_kg": null,
                                    "vaccination_required": true,
                                    "special_animals_allowed": true,
                                    "early_arrival_required": true,
                                    "specific_hours": null
                                },
                                "refund_policies": [{
                                    "type": "no-refund",
                                    "flat_fee": null,
                                    "flat_fee_currency": null,
                                    "percent_fee": null,
                                    "cutoff_reference": "departure-date",
                                    "cutoff_from": null,
                                    "cutoff_to": null,
                                    "external_link": null
                                }],
                                "refund": false,
                                "refund_cutoff": null,
                                "exchange_policies": [{
                                    "type": "station",
                                    "flat_fee": 2000,
                                    "flat_fee_currency": "USD",
                                    "percent_fee": null,
                                    "cutoff_reference": "departure-date",
                                    "cutoff_from": null,
                                    "cutoff_to": 24,
                                    "external_link": null
                                }],
                                "exchange": true,
                                "exchange_cutoff": 24,
                                "exchange_cutoff_at": "2018-08-01T22:30:00.000Z",
                                "currency": "USD",
                                "addons": {},
                                "piece_of_id": true,
                                "boarding_requirement": "printed_tkt",
                                "extra_bag_policy": true,
                                "extra_bag_cost": 1500,
                                "extra_bag_kg_cost": null,
                                "bag_allowed": true
                            }
                        }, {
                            "amenities": {
                                "display_name": "-",
                                "wifi": true,
                                "toilet": true,
                                "ac": true,
                                "refreshment": false,
                                "food": false,
                                "hot_meal": false,
                                "power_outlets": true,
                                "tv": false,
                                "bus_attendant": false,
                                "leg_room": false,
                                "small_seat": false,
                                "average_seat": true,
                                "xl_seat": false,
                                "full_recline_seat": false
                            },
                            "arrival_timezone": "America/Montreal",
                            "available_seats": 50,
                            "bus": null,
                            "busbud_departure_id": "307486e2",
                            "class": "Economy",
                            "class_name": "-",
                            "deeplink": null,
                            "departure_timezone": "America/New_York",
                            "departure_type": null,
                            "destination_location_id": 1938,
                            "duration": 499,
                            "has_search_details": true,
                            "has_transfers": false,
                            "has_addons": null,
                            "id": "YWEzNDA4ZmQ6MzA3NDg2ZTI",
                            "links": {"deeplink": "https://www.busbud.com/fr/deeplink/dr5reg/f25dvk/YWEzNDA4ZmQ6MzA3NDg2ZTI?outbound_date=2018-08-02&return_date&adults=2&children=0&seniors=0&child_ages=&senior_ages=&discount_code&utm_source={utm_source}&utm_campaign={utm_campaign}&utm_medium={utm_medium}"},
                            "num_transfers": 0,
                            "operator_id": "bfc27cd5-44ca-49c1-8d00-0f2bc00c58c0",
                            "origin_location_id": 1942,
                            "schedule_id": null,
                            "sellable": true,
                            "source_id": 155,
                            "ticket_types": ["print", "claim"],
                            "departure_time": "2018-08-02T00:01:00",
                            "arrival_time": "2018-08-02T08:20:00",
                            "fetched_at": "2017-12-02T12:58:36.866Z",
                            "prices": {
                                "currency": "EUR",
                                "total": 8963,
                                "categories": {},
                                "discount": 0,
                                "roundtrip_min": null,
                                "roundtrip_total": null,
                                "discounted": null,
                                "breakdown": {"base": 8963, "fees": 0, "taxes": 0, "discount": 0}
                            },
                            "trip_stops": null,
                            "addons": null,
                            "details": {},
                            "terms": {
                                "type_of_id": "photo_and_full_name",
                                "ticket_requirements": {
                                    "print": "printed_tkt",
                                    "voucher": "printed_tkt",
                                    "claim": "printed_tkt"
                                },
                                "nb_carry_on": 1,
                                "kg_by_carry_on": 11,
                                "nb_checked_bags": 1,
                                "kg_by_bag": 23,
                                "checked_in_size_cm": null,
                                "extra_checked_in_fees": {"type": "per_extra_checked_in", "amount": 1500},
                                "oversized_luggage": {
                                    "allowed": true,
                                    "allowed_types": ["bicycle", "sport_equipment"],
                                    "fees": {"type": "as_additional_luggage", "amount": null},
                                    "early_arrival_required": true,
                                    "cover_required": true
                                },
                                "animals": {
                                    "fees": {"type": "unknown", "amount": null, "percent": null},
                                    "main_compartment_allowed": false,
                                    "hold_compartment_allowed": false,
                                    "main_max_weight_kg": null,
                                    "main_small_cage_required": null,
                                    "hold_max_weight_kg": null,
                                    "vaccination_required": true,
                                    "special_animals_allowed": true,
                                    "early_arrival_required": true,
                                    "specific_hours": null
                                },
                                "refund_policies": [{
                                    "type": "no-refund",
                                    "flat_fee": null,
                                    "flat_fee_currency": null,
                                    "percent_fee": null,
                                    "cutoff_reference": "departure-date",
                                    "cutoff_from": null,
                                    "cutoff_to": null,
                                    "external_link": null
                                }],
                                "refund": false,
                                "refund_cutoff": null,
                                "exchange_policies": [{
                                    "type": "station",
                                    "flat_fee": 2500,
                                    "flat_fee_currency": "USD",
                                    "percent_fee": null,
                                    "cutoff_reference": "departure-date",
                                    "cutoff_from": null,
                                    "cutoff_to": 1,
                                    "external_link": null
                                }],
                                "exchange": true,
                                "exchange_cutoff": 1,
                                "exchange_cutoff_at": "2018-08-02T03:01:00.000Z",
                                "currency": "USD",
                                "addons": {},
                                "piece_of_id": true,
                                "boarding_requirement": "printed_tkt",
                                "extra_bag_policy": true,
                                "extra_bag_cost": 1500,
                                "extra_bag_kg_cost": null,
                                "bag_allowed": true
                            }
                        }, {
                            "amenities": {
                                "display_name": "-",
                                "wifi": true,
                                "toilet": true,
                                "ac": true,
                                "refreshment": false,
                                "food": false,
                                "hot_meal": false,
                                "power_outlets": true,
                                "tv": false,
                                "bus_attendant": false,
                                "leg_room": false,
                                "small_seat": false,
                                "average_seat": true,
                                "xl_seat": false,
                                "full_recline_seat": false
                            },
                            "arrival_timezone": "America/Montreal",
                            "available_seats": 50,
                            "bus": null,
                            "busbud_departure_id": "4bb3bf0e",
                            "class": "Economy",
                            "class_name": "-",
                            "deeplink": null,
                            "departure_timezone": "America/New_York",
                            "departure_type": null,
                            "destination_location_id": 1938,
                            "duration": 575,
                            "has_search_details": true,
                            "has_transfers": false,
                            "has_addons": null,
                            "id": "ODBjZmVjZjo0YmIzYmYwZQ",
                            "links": {"deeplink": "https://www.busbud.com/fr/deeplink/dr5reg/f25dvk/ODBjZmVjZjo0YmIzYmYwZQ?outbound_date=2018-08-02&return_date&adults=2&children=0&seniors=0&child_ages=&senior_ages=&discount_code&utm_source={utm_source}&utm_campaign={utm_campaign}&utm_medium={utm_medium}"},
                            "num_transfers": 0,
                            "operator_id": "bfc27cd5-44ca-49c1-8d00-0f2bc00c58c0",
                            "origin_location_id": 1942,
                            "schedule_id": null,
                            "sellable": true,
                            "source_id": 155,
                            "ticket_types": ["print", "claim"],
                            "departure_time": "2018-08-02T08:30:00",
                            "arrival_time": "2018-08-02T18:05:00",
                            "fetched_at": "2017-12-02T12:58:36.866Z",
                            "prices": {
                                "currency": "EUR",
                                "total": 8963,
                                "categories": {},
                                "discount": 0,
                                "roundtrip_min": null,
                                "roundtrip_total": null,
                                "discounted": null,
                                "breakdown": {"base": 8963, "fees": 0, "taxes": 0, "discount": 0}
                            },
                            "trip_stops": null,
                            "addons": null,
                            "details": {},
                            "terms": {
                                "type_of_id": "photo_and_full_name",
                                "ticket_requirements": {
                                    "print": "printed_tkt",
                                    "voucher": "printed_tkt",
                                    "claim": "printed_tkt"
                                },
                                "nb_carry_on": 1,
                                "kg_by_carry_on": 11,
                                "nb_checked_bags": 1,
                                "kg_by_bag": 23,
                                "checked_in_size_cm": null,
                                "extra_checked_in_fees": {"type": "per_extra_checked_in", "amount": 1500},
                                "oversized_luggage": {
                                    "allowed": true,
                                    "allowed_types": ["bicycle", "sport_equipment"],
                                    "fees": {"type": "as_additional_luggage", "amount": null},
                                    "early_arrival_required": true,
                                    "cover_required": true
                                },
                                "animals": {
                                    "fees": {"type": "unknown", "amount": null, "percent": null},
                                    "main_compartment_allowed": false,
                                    "hold_compartment_allowed": false,
                                    "main_max_weight_kg": null,
                                    "main_small_cage_required": null,
                                    "hold_max_weight_kg": null,
                                    "vaccination_required": true,
                                    "special_animals_allowed": true,
                                    "early_arrival_required": true,
                                    "specific_hours": null
                                },
                                "refund_policies": [{
                                    "type": "no-refund",
                                    "flat_fee": null,
                                    "flat_fee_currency": null,
                                    "percent_fee": null,
                                    "cutoff_reference": "departure-date",
                                    "cutoff_from": null,
                                    "cutoff_to": null,
                                    "external_link": null
                                }],
                                "refund": false,
                                "refund_cutoff": null,
                                "exchange_policies": [{
                                    "type": "station",
                                    "flat_fee": 2500,
                                    "flat_fee_currency": "USD",
                                    "percent_fee": null,
                                    "cutoff_reference": "departure-date",
                                    "cutoff_from": null,
                                    "cutoff_to": 1,
                                    "external_link": null
                                }],
                                "exchange": true,
                                "exchange_cutoff": 1,
                                "exchange_cutoff_at": "2018-08-02T11:30:00.000Z",
                                "currency": "USD",
                                "addons": {},
                                "piece_of_id": true,
                                "boarding_requirement": "printed_tkt",
                                "extra_bag_policy": true,
                                "extra_bag_cost": 1500,
                                "extra_bag_kg_cost": null,
                                "bag_allowed": true
                            }
                        }, {
                            "amenities": {
                                "display_name": "-",
                                "wifi": true,
                                "toilet": true,
                                "ac": true,
                                "refreshment": false,
                                "food": false,
                                "hot_meal": false,
                                "power_outlets": true,
                                "tv": false,
                                "bus_attendant": false,
                                "leg_room": false,
                                "small_seat": false,
                                "average_seat": true,
                                "xl_seat": false,
                                "full_recline_seat": false
                            },
                            "arrival_timezone": "America/Montreal",
                            "available_seats": 50,
                            "bus": null,
                            "busbud_departure_id": "85a54ee8",
                            "class": "Economy",
                            "class_name": "-",
                            "deeplink": null,
                            "departure_timezone": "America/New_York",
                            "departure_type": null,
                            "destination_location_id": 1938,
                            "duration": 530,
                            "has_search_details": true,
                            "has_transfers": false,
                            "has_addons": null,
                            "id": "YjFiOTczNjk6ODVhNTRlZTg",
                            "links": {"deeplink": "https://www.busbud.com/fr/deeplink/dr5reg/f25dvk/YjFiOTczNjk6ODVhNTRlZTg?outbound_date=2018-08-02&return_date&adults=2&children=0&seniors=0&child_ages=&senior_ages=&discount_code&utm_source={utm_source}&utm_campaign={utm_campaign}&utm_medium={utm_medium}"},
                            "num_transfers": 0,
                            "operator_id": "bfc27cd5-44ca-49c1-8d00-0f2bc00c58c0",
                            "origin_location_id": 1942,
                            "schedule_id": null,
                            "sellable": true,
                            "source_id": 155,
                            "ticket_types": ["print", "claim"],
                            "departure_time": "2018-08-02T20:45:00",
                            "arrival_time": "2018-08-03T05:35:00",
                            "fetched_at": "2017-12-02T12:58:36.866Z",
                            "prices": {
                                "currency": "EUR",
                                "total": 8963,
                                "categories": {},
                                "discount": 0,
                                "roundtrip_min": null,
                                "roundtrip_total": null,
                                "discounted": null,
                                "breakdown": {"base": 8963, "fees": 0, "taxes": 0, "discount": 0}
                            },
                            "trip_stops": null,
                            "addons": null,
                            "details": {},
                            "terms": {
                                "type_of_id": "photo_and_full_name",
                                "ticket_requirements": {
                                    "print": "printed_tkt",
                                    "voucher": "printed_tkt",
                                    "claim": "printed_tkt"
                                },
                                "nb_carry_on": 1,
                                "kg_by_carry_on": 11,
                                "nb_checked_bags": 1,
                                "kg_by_bag": 23,
                                "checked_in_size_cm": null,
                                "extra_checked_in_fees": {"type": "per_extra_checked_in", "amount": 1500},
                                "oversized_luggage": {
                                    "allowed": true,
                                    "allowed_types": ["bicycle", "sport_equipment"],
                                    "fees": {"type": "as_additional_luggage", "amount": null},
                                    "early_arrival_required": true,
                                    "cover_required": true
                                },
                                "animals": {
                                    "fees": {"type": "unknown", "amount": null, "percent": null},
                                    "main_compartment_allowed": false,
                                    "hold_compartment_allowed": false,
                                    "main_max_weight_kg": null,
                                    "main_small_cage_required": null,
                                    "hold_max_weight_kg": null,
                                    "vaccination_required": true,
                                    "special_animals_allowed": true,
                                    "early_arrival_required": true,
                                    "specific_hours": null
                                },
                                "refund_policies": [{
                                    "type": "no-refund",
                                    "flat_fee": null,
                                    "flat_fee_currency": null,
                                    "percent_fee": null,
                                    "cutoff_reference": "departure-date",
                                    "cutoff_from": null,
                                    "cutoff_to": null,
                                    "external_link": null
                                }],
                                "refund": false,
                                "refund_cutoff": null,
                                "exchange_policies": [{
                                    "type": "station",
                                    "flat_fee": 2500,
                                    "flat_fee_currency": "USD",
                                    "percent_fee": null,
                                    "cutoff_reference": "departure-date",
                                    "cutoff_from": null,
                                    "cutoff_to": 1,
                                    "external_link": null
                                }],
                                "exchange": true,
                                "exchange_cutoff": 1,
                                "exchange_cutoff_at": "2018-08-02T23:45:00.000Z",
                                "currency": "USD",
                                "addons": {},
                                "piece_of_id": true,
                                "boarding_requirement": "printed_tkt",
                                "extra_bag_policy": true,
                                "extra_bag_cost": 1500,
                                "extra_bag_kg_cost": null,
                                "bag_allowed": true
                            }
                        }, {
                            "amenities": {
                                "display_name": "-",
                                "wifi": true,
                                "toilet": true,
                                "ac": true,
                                "refreshment": false,
                                "food": false,
                                "hot_meal": false,
                                "power_outlets": true,
                                "tv": false,
                                "bus_attendant": false,
                                "leg_room": false,
                                "small_seat": false,
                                "average_seat": true,
                                "xl_seat": false,
                                "full_recline_seat": false
                            },
                            "arrival_timezone": "America/Montreal",
                            "available_seats": 50,
                            "bus": null,
                            "busbud_departure_id": "cc2dd8b1",
                            "class": "Economy",
                            "class_name": "-",
                            "deeplink": null,
                            "departure_timezone": "America/New_York",
                            "departure_type": null,
                            "destination_location_id": 1938,
                            "duration": 1010,
                            "has_search_details": true,
                            "has_transfers": true,
                            "has_addons": null,
                            "id": "ZmI3YzAyYmQ6Y2MyZGQ4YjE",
                            "links": {"deeplink": "https://www.busbud.com/fr/deeplink/dr5reg/f25dvk/ZmI3YzAyYmQ6Y2MyZGQ4YjE?outbound_date=2018-08-02&return_date&adults=2&children=0&seniors=0&child_ages=&senior_ages=&discount_code&utm_source={utm_source}&utm_campaign={utm_campaign}&utm_medium={utm_medium}"},
                            "num_transfers": null,
                            "operator_id": "bfc27cd5-44ca-49c1-8d00-0f2bc00c58c0",
                            "origin_location_id": 36102,
                            "schedule_id": null,
                            "sellable": true,
                            "source_id": 155,
                            "ticket_types": ["print", "claim"],
                            "departure_time": "2018-08-02T12:45:00",
                            "arrival_time": "2018-08-03T05:35:00",
                            "fetched_at": "2017-12-02T12:58:33.942Z",
                            "prices": {
                                "currency": "EUR",
                                "total": 8963,
                                "categories": {},
                                "discount": 0,
                                "roundtrip_min": null,
                                "roundtrip_total": null,
                                "discounted": null,
                                "breakdown": {"base": 8963, "fees": 0, "taxes": 0, "discount": 0}
                            },
                            "trip_stops": null,
                            "addons": null,
                            "details": {"num_transfers": 2},
                            "terms": {
                                "type_of_id": "photo_and_full_name",
                                "ticket_requirements": {
                                    "print": "printed_tkt",
                                    "voucher": "printed_tkt",
                                    "claim": "printed_tkt"
                                },
                                "nb_carry_on": 1,
                                "kg_by_carry_on": 11,
                                "nb_checked_bags": 1,
                                "kg_by_bag": 23,
                                "checked_in_size_cm": null,
                                "extra_checked_in_fees": {"type": "per_extra_checked_in", "amount": 1500},
                                "oversized_luggage": {
                                    "allowed": true,
                                    "allowed_types": ["bicycle", "sport_equipment"],
                                    "fees": {"type": "as_additional_luggage", "amount": null},
                                    "early_arrival_required": true,
                                    "cover_required": true
                                },
                                "animals": {
                                    "fees": {"type": "unknown", "amount": null, "percent": null},
                                    "main_compartment_allowed": false,
                                    "hold_compartment_allowed": false,
                                    "main_max_weight_kg": null,
                                    "main_small_cage_required": null,
                                    "hold_max_weight_kg": null,
                                    "vaccination_required": true,
                                    "special_animals_allowed": true,
                                    "early_arrival_required": true,
                                    "specific_hours": null
                                },
                                "refund_policies": [{
                                    "type": "no-refund",
                                    "flat_fee": null,
                                    "flat_fee_currency": null,
                                    "percent_fee": null,
                                    "cutoff_reference": "departure-date",
                                    "cutoff_from": null,
                                    "cutoff_to": null,
                                    "external_link": null
                                }],
                                "refund": false,
                                "refund_cutoff": null,
                                "exchange_policies": [{
                                    "type": "station",
                                    "flat_fee": 2500,
                                    "flat_fee_currency": "USD",
                                    "percent_fee": null,
                                    "cutoff_reference": "departure-date",
                                    "cutoff_from": null,
                                    "cutoff_to": 1,
                                    "external_link": null
                                }],
                                "exchange": true,
                                "exchange_cutoff": 1,
                                "exchange_cutoff_at": "2018-08-02T15:45:00.000Z",
                                "currency": "USD",
                                "addons": {},
                                "piece_of_id": true,
                                "boarding_requirement": "printed_tkt",
                                "extra_bag_policy": true,
                                "extra_bag_cost": 1500,
                                "extra_bag_kg_cost": null,
                                "bag_allowed": true
                            }
                        }, {
                            "amenities": {
                                "display_name": "-",
                                "wifi": true,
                                "toilet": true,
                                "ac": true,
                                "refreshment": false,
                                "food": false,
                                "hot_meal": false,
                                "power_outlets": true,
                                "tv": false,
                                "bus_attendant": false,
                                "leg_room": false,
                                "small_seat": false,
                                "average_seat": true,
                                "xl_seat": false,
                                "full_recline_seat": false
                            },
                            "arrival_timezone": "America/Montreal",
                            "available_seats": 50,
                            "bus": null,
                            "busbud_departure_id": "83b50492",
                            "class": "Economy",
                            "class_name": "-",
                            "deeplink": null,
                            "departure_timezone": "America/New_York",
                            "departure_type": null,
                            "destination_location_id": 1938,
                            "duration": 795,
                            "has_search_details": true,
                            "has_transfers": true,
                            "has_addons": null,
                            "id": "MWUxYWU5YTk6ODNiNTA0OTI",
                            "links": {"deeplink": "https://www.busbud.com/fr/deeplink/dr5reg/f25dvk/MWUxYWU5YTk6ODNiNTA0OTI?outbound_date=2018-08-02&return_date&adults=2&children=0&seniors=0&child_ages=&senior_ages=&discount_code&utm_source={utm_source}&utm_campaign={utm_campaign}&utm_medium={utm_medium}"},
                            "num_transfers": null,
                            "operator_id": "bfc27cd5-44ca-49c1-8d00-0f2bc00c58c0",
                            "origin_location_id": 36102,
                            "schedule_id": null,
                            "sellable": true,
                            "source_id": 155,
                            "ticket_types": ["print", "claim"],
                            "departure_time": "2018-08-02T17:30:00",
                            "arrival_time": "2018-08-03T06:45:00",
                            "fetched_at": "2017-12-02T12:58:33.942Z",
                            "prices": {
                                "currency": "EUR",
                                "total": 8963,
                                "categories": {},
                                "discount": 0,
                                "roundtrip_min": null,
                                "roundtrip_total": null,
                                "discounted": null,
                                "breakdown": {"base": 8963, "fees": 0, "taxes": 0, "discount": 0}
                            },
                            "trip_stops": null,
                            "addons": null,
                            "details": {"num_transfers": 1},
                            "terms": {
                                "type_of_id": "photo_and_full_name",
                                "ticket_requirements": {
                                    "print": "printed_tkt",
                                    "voucher": "printed_tkt",
                                    "claim": "printed_tkt"
                                },
                                "nb_carry_on": 1,
                                "kg_by_carry_on": 11,
                                "nb_checked_bags": 1,
                                "kg_by_bag": 23,
                                "checked_in_size_cm": null,
                                "extra_checked_in_fees": {"type": "per_extra_checked_in", "amount": 1500},
                                "oversized_luggage": {
                                    "allowed": true,
                                    "allowed_types": ["bicycle", "sport_equipment"],
                                    "fees": {"type": "as_additional_luggage", "amount": null},
                                    "early_arrival_required": true,
                                    "cover_required": true
                                },
                                "animals": {
                                    "fees": {"type": "unknown", "amount": null, "percent": null},
                                    "main_compartment_allowed": false,
                                    "hold_compartment_allowed": false,
                                    "main_max_weight_kg": null,
                                    "main_small_cage_required": null,
                                    "hold_max_weight_kg": null,
                                    "vaccination_required": true,
                                    "special_animals_allowed": true,
                                    "early_arrival_required": true,
                                    "specific_hours": null
                                },
                                "refund_policies": [{
                                    "type": "no-refund",
                                    "flat_fee": null,
                                    "flat_fee_currency": null,
                                    "percent_fee": null,
                                    "cutoff_reference": "departure-date",
                                    "cutoff_from": null,
                                    "cutoff_to": null,
                                    "external_link": null
                                }],
                                "refund": false,
                                "refund_cutoff": null,
                                "exchange_policies": [{
                                    "type": "station",
                                    "flat_fee": 2500,
                                    "flat_fee_currency": "USD",
                                    "percent_fee": null,
                                    "cutoff_reference": "departure-date",
                                    "cutoff_from": null,
                                    "cutoff_to": 1,
                                    "external_link": null
                                }],
                                "exchange": true,
                                "exchange_cutoff": 1,
                                "exchange_cutoff_at": "2018-08-02T20:30:00.000Z",
                                "currency": "USD",
                                "addons": {},
                                "piece_of_id": true,
                                "boarding_requirement": "printed_tkt",
                                "extra_bag_policy": true,
                                "extra_bag_cost": 1500,
                                "extra_bag_kg_cost": null,
                                "bag_allowed": true
                            }
                        }, {
                            "amenities": {
                                "display_name": "-",
                                "wifi": true,
                                "toilet": true,
                                "ac": true,
                                "refreshment": false,
                                "food": false,
                                "hot_meal": false,
                                "power_outlets": true,
                                "tv": false,
                                "bus_attendant": false,
                                "leg_room": false,
                                "small_seat": false,
                                "average_seat": true,
                                "xl_seat": false,
                                "full_recline_seat": false
                            },
                            "arrival_timezone": "America/Montreal",
                            "available_seats": 50,
                            "bus": null,
                            "busbud_departure_id": "5032e458",
                            "class": "Economy",
                            "class_name": "-",
                            "deeplink": null,
                            "departure_timezone": "America/New_York",
                            "departure_type": null,
                            "destination_location_id": 1938,
                            "duration": 1290,
                            "has_search_details": true,
                            "has_transfers": true,
                            "has_addons": null,
                            "id": "OWE0YWZkM2M6NTAzMmU0NTg",
                            "links": {"deeplink": "https://www.busbud.com/fr/deeplink/dr5reg/f25dvk/OWE0YWZkM2M6NTAzMmU0NTg?outbound_date=2018-08-02&return_date&adults=2&children=0&seniors=0&child_ages=&senior_ages=&discount_code&utm_source={utm_source}&utm_campaign={utm_campaign}&utm_medium={utm_medium}"},
                            "num_transfers": null,
                            "operator_id": "bfc27cd5-44ca-49c1-8d00-0f2bc00c58c0",
                            "origin_location_id": 36102,
                            "schedule_id": null,
                            "sellable": true,
                            "source_id": 155,
                            "ticket_types": ["print", "claim"],
                            "departure_time": "2018-08-02T20:35:00",
                            "arrival_time": "2018-08-03T18:05:00",
                            "fetched_at": "2017-12-02T12:58:33.942Z",
                            "prices": {
                                "currency": "EUR",
                                "total": 8963,
                                "categories": {},
                                "discount": 0,
                                "roundtrip_min": null,
                                "roundtrip_total": null,
                                "discounted": null,
                                "breakdown": {"base": 8963, "fees": 0, "taxes": 0, "discount": 0}
                            },
                            "trip_stops": null,
                            "addons": null,
                            "details": {"num_transfers": 2},
                            "terms": {
                                "type_of_id": "photo_and_full_name",
                                "ticket_requirements": {
                                    "print": "printed_tkt",
                                    "voucher": "printed_tkt",
                                    "claim": "printed_tkt"
                                },
                                "nb_carry_on": 1,
                                "kg_by_carry_on": 11,
                                "nb_checked_bags": 1,
                                "kg_by_bag": 23,
                                "checked_in_size_cm": null,
                                "extra_checked_in_fees": {"type": "per_extra_checked_in", "amount": 1500},
                                "oversized_luggage": {
                                    "allowed": true,
                                    "allowed_types": ["bicycle", "sport_equipment"],
                                    "fees": {"type": "as_additional_luggage", "amount": null},
                                    "early_arrival_required": true,
                                    "cover_required": true
                                },
                                "animals": {
                                    "fees": {"type": "unknown", "amount": null, "percent": null},
                                    "main_compartment_allowed": false,
                                    "hold_compartment_allowed": false,
                                    "main_max_weight_kg": null,
                                    "main_small_cage_required": null,
                                    "hold_max_weight_kg": null,
                                    "vaccination_required": true,
                                    "special_animals_allowed": true,
                                    "early_arrival_required": true,
                                    "specific_hours": null
                                },
                                "refund_policies": [{
                                    "type": "no-refund",
                                    "flat_fee": null,
                                    "flat_fee_currency": null,
                                    "percent_fee": null,
                                    "cutoff_reference": "departure-date",
                                    "cutoff_from": null,
                                    "cutoff_to": null,
                                    "external_link": null
                                }],
                                "refund": false,
                                "refund_cutoff": null,
                                "exchange_policies": [{
                                    "type": "station",
                                    "flat_fee": 2500,
                                    "flat_fee_currency": "USD",
                                    "percent_fee": null,
                                    "cutoff_reference": "departure-date",
                                    "cutoff_from": null,
                                    "cutoff_to": 1,
                                    "external_link": null
                                }],
                                "exchange": true,
                                "exchange_cutoff": 1,
                                "exchange_cutoff_at": "2018-08-02T23:35:00.000Z",
                                "currency": "USD",
                                "addons": {},
                                "piece_of_id": true,
                                "boarding_requirement": "printed_tkt",
                                "extra_bag_policy": true,
                                "extra_bag_cost": 1500,
                                "extra_bag_kg_cost": null,
                                "bag_allowed": true
                            }
                        }],
                        "complete": true,
                        "ttl": 426,
                        "is_valid_route": true
                    });
                return;*/
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
            var operators = {};
            for (var i = 0; i < trip.operators.length; i++) {
                operators[trip.operators[i].id] = trip.operators[i];
            }
            trip.operators_by_id = operators;
            return trip;
        };

        var setLocationsById = function(trip) {
            var locations = {};
            for (var i = 0; i < trip.locations.length; i++) {
                locations[trip.locations[i].id] = trip.locations[i];
            }
            trip.locations_by_id = locations;
            return trip;
        };

        var formatDates = function(trip) {
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
