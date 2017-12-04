(function() {
    angular.module("busbud.components")
        .component('departureInfo', {
            templateUrl: "components/departure-info.html",
            controllerAs: "$ctrl",
            bindToController: true,
            bindings: {
                time: "<",
                location: "<"
            }
        });
})
();
