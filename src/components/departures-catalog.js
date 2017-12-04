(function() {
    function departuresCatalogCtrl($translate) {
        var _this = this;
        var tripDescription = null;
        _this.tripDescriptionTranslation = null;
        this.$onInit = function() {
            $translate('tripDescription').then(function(translation) {
                tripDescription = translation;
            });
        };

        this.$onChanges = function(changes) {
            if (changes && changes.trip && changes.trip.currentValue) {
                _this.tripDescriptionTranslation =  tripDescription
                    .replace("#from#", changes.trip.currentValue.cities[0].name)
                    .replace("#to#", changes.trip.currentValue.cities[1].name);
            }
        };
    }

    angular.module("busbud.components")
        .controller('departuresCatalogCtrl', departuresCatalogCtrl)
        .component('departuresCatalog', {
            templateUrl: "components/departures-catalog.html",
            controller: departuresCatalogCtrl,
            controllerAs: "$ctrl",
            bindToController: true,
            bindings: {
                trip: "<"
            }
        });
})
();

