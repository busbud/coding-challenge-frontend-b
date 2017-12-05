(function() {
    function departureWidgetCtrl() {

    }

    angular.module("busbud.components")
        .controller('departureWidgetCtrl', departureWidgetCtrl)
        .component('departureWidget', {
            templateUrl: "components/departure-widget.html",
            controller: departureWidgetCtrl,
            controllerAs: "$ctrl",
            bindToController: true,
            bindings: {
                departure: "<",
                operator: "<",
                originLoc: "<",
                destinationLoc: "<"
            }
        });
})
();
