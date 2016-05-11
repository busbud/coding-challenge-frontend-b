var expect = require("chai").expect,
    time = require("../../src/scripts/helpers/toTime");

describe("helperToTime()", function() {
    it("should return 24h-based time, with 12h-clock period, based on current timezone", function() {
        expect(time("2015-01-01T12:00:00")).to.eql("12:00 PM");
        expect(time("2015-01-01T17:30:45")).to.eql("17:30 PM");
        expect(time("2015-01-01T01:03:45")).to.eql("01:03 AM");
    });
});