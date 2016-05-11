var expect = require("chai").expect,
    currency = require("../../src/scripts/helpers/toCurrency");

describe("helperToCurrency()", function() {
    it("should return a pre-formatted ticket value", function() {
        expect(currency(1200)).to.eql("$12<sup>CAD</sup>");
    });
    it("shoudl round to nearest integer", function() {
        expect(currency(1230)).to.eql("$12<sup>CAD</sup>");
        expect(currency(1270)).to.eql("$13<sup>CAD</sup>");
    });
});