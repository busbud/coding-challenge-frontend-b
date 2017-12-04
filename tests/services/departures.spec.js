describe("departure service", function() {
    var departures, $httpBackend, $rootScope, $timeout, trip, departure1, departure2;

    beforeEach(function() {
        module("busbud.svc.departures");
        inject(function(_departures_, _$httpBackend_, _$rootScope_, _$timeout_) {
            departures = _departures_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            $timeout = _$timeout_;
        });
        trip = {
            from: "12345",
            to: "6578",
            when: "now"
        };
        departure1 = {
            id: "dep1",
            duration: 985,
            departure_time: "2018-08-02T13:22:00",
            arrival_time: "2018-08-02T22:43:00"
        };

        departure2 = {
            id: "dep2",
            duration: 500,
            departure_time: "2018-08-02T11:00:00",
            arrival_time: "2018-08-02T19:55:00"
        };
        moment.locale("en");
    });

    it("call busbud api", function(done) {
        $httpBackend.expectGET("https://napi.busbud.com/x-departures/12345/6578/now?lang=en")
            .respond({complete: true});
        departures.getFormattedTrip(trip)
            .then(function() {
                done();
            })
            .catch(done.fail);

        $rootScope.$apply();
        $httpBackend.flush();
    });

    it("call busbud api with moment language", function(done) {
        moment.locale("fr-ca");
        $httpBackend.expectGET("https://napi.busbud.com/x-departures/12345/6578/now?lang=fr")
            .respond({complete: true});
        departures.getFormattedTrip(trip)
            .then(function() {
                done();
            })
            .catch(done.fail);

        $rootScope.$apply();
        $httpBackend.flush();
    });

    it("call with index if not complete and concat departures", function(done) {
        $httpBackend.expectGET("https://napi.busbud.com/x-departures/12345/6578/now?lang=en")
            .respond({complete: false, departures: [departure1]});
        departures.getFormattedTrip(trip)
            .then(function(res) {
                expect(res.departures.length)
                    .toBe(2);
                done();
            })
            .catch(done.fail);

        $rootScope.$apply();
        $httpBackend.flush();
        $httpBackend.expectGET("https://napi.busbud.com/x-departures/12345/6578/now?lang=en&index=1")
            .respond({complete: true, departures: [departure2]});
        $timeout.flush();
        $httpBackend.flush();
    });

    it("format and sort data", function(done) {
        $httpBackend.expectGET("https://napi.busbud.com/x-departures/12345/6578/now?lang=en")
            .respond({
                complete: true,
                departures: [departure1, departure2],
                operators: [{id: "op1"}, {id: "op2"}],
                locations: [{id: "loc1"}, {id: "loc2"}]
            });

        departures.getFormattedTrip(trip)
            .then(function(res) {
                expect(res.departures.length)
                    .toBe(2);
                //sort by date
                expect(res.departures[0].id)
                    .toBe("dep2");
                expect(res.departures[1].id)
                    .toBe("dep1");
                //format date
                expect(res.departures[0].formatted_dates)
                    .toEqual({duration: '08:20', departure_time: '11:00 AM', arrival_time: '7:55 PM'});
                expect(res.departures[1].formatted_dates)
                    .toEqual({duration: '16:25', departure_time: '1:22 PM', arrival_time: '10:43 PM'});
                //operators by id
                expect(res.operators_by_id)
                    .toEqual({op1: {id: "op1"}, op2: {id: "op2"}});
                //locations by id
                expect(res.locations_by_id)
                    .toEqual({loc1: {id: "loc1"}, loc2: {id: "loc2"}});
                done();
            })
            .catch(done.fail);

        $rootScope.$apply();
        $httpBackend.flush();
    });
});
