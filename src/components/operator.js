(function() {
    angular.module("busbud.components")
        .component('operator', {
            templateUrl: "components/operator.html",
            controllerAs: "$ctrl",
            bindToController: true,
            bindings: {
                operator: "<"
            }
        });
})
();

