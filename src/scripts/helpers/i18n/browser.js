var langs = {
        en: require("./lexicons/en.json"),
        fr: require("./lexicons/fr.json")
    },
    lang = require("../../search/getURLParams")().lang || "en";

module.exports = function i18nHelper(str) {
    return langs[lang][str] || "";
};
