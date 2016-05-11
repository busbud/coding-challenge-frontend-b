var langs = {
        en: require("./lexicons/en.json"),
        fr: require("./lexicons/fr.json")
    },
    session = require("../../session");

module.exports = function i18nHelper(str) {
    return langs[session.language || "en"][str] || "";
};
