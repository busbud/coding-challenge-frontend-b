var moment = require("moment");

/**
 * Takes a raw datetime + timezone string and parses equivalent local time
 * @param {string} time - datetime string to format
 * @returns {string} - HH:mm A time format
 */
module.exports = function toTime(time) {
    return moment(time).format("HH:mm A");
};
