var axios = require("axios");

var busbud = axios.create({
  baseURL: "https://napi.busbud.com/x-departures/",
  timeout: 1000,
  headers: {
    Accept:
      "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
    "X-Busbud-Token": "PARTNER_JSWsVZQcS_KzxNRzGtIt1A"
  }
});

busbud.search = function(source, destination, date, options = {}) {
  busbud
    .get("/" + source + "/" + destination + "/" + date)
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
};

module.exports = busbud;
