(function() {
    function osheagaTripCrl(departures) {
        var _this = this;
        _this.trip = null;

        _this.searchTrip = function() {
            var trip = {
                from: "dr5reg", //NY
                to: "f25dvk", //Montréal
                when: "2018-08-02"
            };
            departures.getFormattedTrip(trip)
                .then(function(trip) {
                    _this.trip = trip;
                })
                .catch(console.error);
        };
    }

    angular.module("busbud.components")
        .controller('osheagaTripCrl', osheagaTripCrl)
        .component('osheagaTrip', {
            templateUrl: "components/osheaga-trip.html",
            controller: osheagaTripCrl,
            controllerAs: "$ctrl",
            bindToController: true,
            bindings: {}
        });
})
();


