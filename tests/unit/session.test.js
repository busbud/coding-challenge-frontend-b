var expect = require("chai").expect,
    session = require("../../src/scripts/session");

describe("session", function() {
    it("should accept language being set to 'fr'", function() {
        session.language = "fr";
        expect(session.language).to.eql("fr");
    });

    it("should accept language being set to 'en'", function() {
        session.language = "en";
        expect(session.language).to.eql("en");
    });

    it("should reject any language that is not 'fr' or 'en'", function() {
        expect(function() {
            session.language = "en_CA";
        }).to.throw(Error);

        expect(session.language).to.eql("en");

        expect(function() {
            session.language = "fr_CA";
        }).to.throw(Error);

        expect(session.language).to.eql("en");

        expect(function() {
            session.language = "cz";
        }).to.throw(Error);

        expect(session.language).to.eql("en");
    });
});