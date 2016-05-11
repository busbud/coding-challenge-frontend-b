/**
 * Simple url param retriever of current location
 * @returns {object} - key:value pair of name:value of each url param
 */
module.exports = function getURLParams() {
    return window.location.search.split(/\&|\?/g).filter(function(s) {
        return s.length > 0;
    }).reduce(function(obj, str) {
        var parts = str.split("=");

        obj[parts[0]] = parts[1];

        return obj;
    }, {});
};
