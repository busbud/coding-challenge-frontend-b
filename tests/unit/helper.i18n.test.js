var expect = require("chai").expect,
    i18n = require("../../src/scripts/helpers/i18n/server"),
    session = require("../../src/scripts/session");

describe("i18nHelper()", function() {
    it("should replace a key with a string", function() {
        expect(i18n("test-string")).to.eql("this is a test");
    });

    it("should return another language when session language changes", function() {
        session.language = "fr";

        expect(i18n("test-string")).to.eql("ceci est un essai");
    });
});
