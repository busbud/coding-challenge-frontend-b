var domanip = require("domanip"),
    ajax = require("sebastiendaniel-ajax"),
    graph = require("./graph"),
    search = require("./search");

window.Handlebars = require("handlebars/runtime")["default"];
Handlebars.registerHelper(require("./helpers"));

/**
 * Simple global "click" listener used to dispatch actions according to target.
 * @param {object} e - event object
 */
function globalListener(e) {
    if (e.type === "click") {
        // start search
        if (e.target.getAttribute("data-action") === "search") {
            search(function() {
                document.getElementById("resultsContainer").innerHTML = Handlebars.templates.result(
                    {
                        results: graph.Departure.get()
                    }
                );
            });
        }

        // determine which "page" to show
        if (e.target.getAttribute("data-action") === "search") {
            domanip.removeClass(
                "isActive",
                document.getElementById("searchPage")
            );

            domanip.addClass(
                "isActive",
                document.getElementById("resultsPage")
            );
        } else if (e.target.getAttribute("data-action") === "show-search") {
            domanip.removeClass(
                "isActive",
                document.getElementById("resultsPage")
            );

            domanip.addClass(
                "isActive",
                document.getElementById("searchPage")
            );
        }
    }
}

document.body.addEventListener("click", globalListener, true);
