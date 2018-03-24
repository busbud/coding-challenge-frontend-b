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
  let params = {
    adult: 1,
    child: 0,
    senior: 0,
    lang: "CA",
    currency: "CAD"
  };

  params = Object.assign(params, options);
  return new Promise(function(resolve, reject) {
    busbud.get("/" + source + "/" + destination + "/" + date, params)
      .then(function(response) {
        resolve(response.data);
      }).catch(function(error) {
        reject(error);
      });
  });
};

module.exports = busbud;
