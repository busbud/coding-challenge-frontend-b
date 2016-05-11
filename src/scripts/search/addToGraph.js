var graph = require("../graph"),
    moment = require("moment-timezone");

/**
 * Takes a data object and injects any relevant pieces of data
 * into the sessions relational-json database (graph)
 * @param {object} data - object containing API responses to add to state
 */
function addToGraph(data) {
    if (typeof data !== "object") {
        throw TypeError("addToGraph expects a object as argument. Provided\n" + data + " (" + typeof data + ")");
    }

    // add Cities
    if (Array.isArray(data.cities)) {
        data.cities.forEach(function(c) {
            var mapped = {
                id: c.id,
                full_name: c.full_name,
                name: c.name
            };

            try {
                graph.City.post(mapped);
            } catch (e) {
                graph.City.put(mapped);
            }
        });
    }

    // add locations
    if (Array.isArray(data.locations)) {
        data.locations.forEach(function(l) {
            var mapped = {
                id: l.id,
                city_id: l.city_id,
                name: l.name,
                address: l.address.join(", ")
            };

            try {
                graph.Location.post(mapped);
            } catch (e) {
                graph.Location.put(mapped);
            }
        });
    }

    // Operators
    if (Array.isArray(data.operators)) {
        data.operators.forEach(function(o) {
            var mapped = {
                id: o.id,
                display_name: o.display_name,
                name: o.name,
                logo_url: o.logo_url
            };

            try {
                graph.Operator.post(mapped);
            } catch (e) {
                graph.Operator.put(mapped);
            }
        });
    }

    // Departures
    if (Array.isArray(data.departures)) {
        data.departures.forEach(function(d) {
            var mapped = {
                id: d.id,
                class: d.class,
                class_name: d.class_name,
                destination_location_id: d.destination_location_id,
                origin_location_id: d.origin_location_id,
                duration: d.duration,
                operator_id: d.operator_id,
                total_price: d.prices.total,
                departure_time: moment.tz(d.departure_time, d.departure_timezone).format(),
                arrival_time: moment.tz(d.arrival_time, d.arrival_timezone).format()
            };

            try {
                graph.Departure.post(mapped);
            } catch (e) {
                graph.Departure.put(mapped);
            }
        });
    }
}

module.exports = addToGraph;
