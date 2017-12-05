import axios from "axios";

const apiHost = "https://napi.busbud.com";

const headers = {
  "Accept": "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
  "X-Busbud-Token": process.env.REACT_APP_API_TOKEN
};

function doFetch(url) {
  return axios(url, {
    method: "GET",
    mode: process.env.NODE_ENV === "development" ? "no-cors" : "",
    headers: headers
  }).then(resp => resp.data);
}

function buildBaseUrl(origin, destination, date) {
  return `${apiHost}/x-departures/${origin}/${destination}/${date.toISOString().substr(0,10)}`
}

const fetcher = {

  initialFetch: function(origin, destination, date) {
    const url = `${buildBaseUrl(origin, destination, date)}`;
    return doFetch(url);
  },

  poll: function(origin, destination, date, index) {
    const url = `${buildBaseUrl(origin, destination, date)}/poll?index=${index}`;
    return doFetch(url);
  }

};

export default fetcher;