"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var format = require("date-fns/format");
var endpoint = 'https://napi.busbud.com/x-departures';
var buildQuery = function (origin, destination, outboundDate) {
    if (origin === void 0) { origin = "dr5reg"; }
    if (destination === void 0) { destination = "f25dvk"; }
    if (outboundDate === void 0) { outboundDate = "2018-08-02"; }
    return endpoint + "/" + origin + "/" + destination + "/" + outboundDate;
};
var headers = {
    Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
};
exports.fetchSearch = function () { return fetch(buildQuery(), { headers: headers }).then(function (res) { return res.json(); }); };
exports.adaptResponse = function (results) {
    return (__assign({}, results, { departures: results.departures.map(function (departure) {
            var hours = departure.duration / 60;
            var minutes = Math.round((hours - Math.floor(hours)) * 60);
            return __assign({}, departure, { arrival_time: format(departure.arrival_time, 'h:mm a'), departure_time: format(departure.departure_time, 'h:mm a'), totalPrice: (departure.prices.total / 100), duration: Math.round(hours) + "h " + minutes + "min" });
        }) }));
};
//# sourceMappingURL=api.js.map