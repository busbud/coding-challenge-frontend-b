var addToGraph = require("./addToGraph"),
    ajax = require("sebastiendaniel-ajax"),
    loader = document.createElement("div"),
    getURLParams = require("./getURLParams"),
    timeoutDelay = 500;

loader.id = "uiLoader";

/**
 * recursive request object that loops (with delay) as long as the request isn't "complete".
 * Every loop accumulates state in the "bundle" object.
 * @param {object} bundle - object that accumulates state for the ongoing request loop
 * @param {function} bundle.cb - callback function triggered once request is complete. It is provided bundle.data as argument.
 * @param {boolean} [polling=false] - has the request begun polling
 */
function req(bundle, polling) {
    var lang = getURLParams().lang || "en";

    ajax({
        url: "https://napi.busbud.com/x-departures/dr5reg/f25dvk/2016-07-29" + (polling ? ("/poll?adult=1&index=" + bundle.index) : "?adult=1") + "&lang=" + lang,
        method: "GET",
        responseType: "json",
        headers: {
            "Accept": "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/"
        },
        onSuccess: function(r) {
            // add new data
            if (r.response.cities) {
                bundle.data.cities = bundle.data.cities.concat(r.response.cities);
            }

            if (r.response.locations) {
                bundle.data.locations = bundle.data.locations.concat(r.response.locations);
            }

            if (r.response.operators) {
                bundle.data.operators = bundle.data.operators.concat(r.response.operators);
            }

            if (r.response.departures) {
                bundle.data.departures = bundle.data.departures.concat(r.response.departures);
            }

            // increment index
            // apparently not zero-index based
            bundle.index += r.response.departures.length;

            // check if complete
            if (r.response.complete === true) {
                window.clearTimeout(bundle.timeout);

                // add data to graph
                addToGraph(bundle.data);

                // trigger callback
                bundle.cb();

                // remove loader
                document.body.removeChild(loader);
            } else {
                bundle.timeout = window.setTimeout(function() {
                    req(bundle, true);
                }, timeoutDelay);
            }
        },
        onFailure: function(r) {
            window.alert("Something went wrong with the request, please try again");
        }
    });
}

/**
 * starts an async request to busbud api
 * @param {function} cb - callback function to trigger was async / poll request is complete
 */
module.exports = function poll(cb) {
    var bundle = {
        data: {
            cities: [],
            operators: [],
            departures: [],
            locations: []
        },
        index: 0,
        cb: cb
    };

    // start uiLoader
    document.body.appendChild(loader);

    req(bundle);
};
