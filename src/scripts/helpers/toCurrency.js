/**
 * Returns the rounded dollar value of the provided cent-value
 * @param {number} value - value in cents
 * @returns {string} HTML partial with currency symbol, rounded value and currency type
 */
module.exports = function toCurrency(value) {
    return "$" + Math.round(value / 100) + "<sup>CAD</sup>";
};
