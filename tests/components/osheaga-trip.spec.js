describe("osheaga-trip", function() {
    var departures, controller, $rootScope, $q;
    beforeEach(function() {
        module("busbud.components");
        inject(function(_departures_, _$rootScope_, $controller, _$q_) {
            departures = _departures_;
            $rootScope = _$rootScope_;
            $q = _$q_;
            controller = $controller("osheagaTripCrl", {}, true)();
        });
    });

    it("get formatted trips from service", function() {
        spyOn(departures, "getFormattedTrip")
            .and.returnValue($q.resolve("trip"));

        controller.searchTrip();
        $rootScope.$apply();

        expect(departures.getFormattedTrip)
            .toHaveBeenCalledWith({
                from: "dr5reg",
                to: "f25dvk",
                when: "2018-08-02"
            });
        expect(controller.trip)
            .toBe("trip");
    });
});
