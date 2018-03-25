var axios = require("axios");
var merge = require('deepmerge');

var busbud = axios.create({
  baseURL: "https://napi.busbud.com/x-departures/",
  timeout: 1000,
  headers: {
    "Accept": "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
    "X-Busbud-Token": "PARTNER_JSWsVZQcS_KzxNRzGtIt1A"
  }
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function fetchData(source, destination, date, params, poll = false) {
  let gatheredData = {};
  return new Promise(function(resolve, reject) {
    let requestUrl = "/" + source + "/" + destination + "/" + date + (poll ? "/poll" : "");
    busbud.get(requestUrl, params).then(function(response) {
      gatheredData = response.data;
      if (gatheredData.complete === false) {
        params.index = gatheredData.departures.length;
        setTimeout(() => {
          fetchData(source, destination, date, params, true).then(data => {
            gatheredData = merge(gatheredData, data);
            resolve(gatheredData);
          }).catch(error => {
            reject(error);
          });
        }, getRandomInt(2000, 5000));
      } else {
        resolve(gatheredData);
      }
    }).catch(function(error) {
      reject(error);
    });
  });
}

busbud.search = function(source, destination, date, options = {}) {
  let params = {
    adult: 1,
    child: 0,
    senior: 0,
    lang: "CA",
    currency: "CAD"
  };

  params = merge(params, options);
  delete params.index;
  return fetchData(source, destination, date, params);
};

module.exports = busbud;
