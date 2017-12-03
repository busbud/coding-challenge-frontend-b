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

const fetcher = {

  initialFetch: function(origin, destination, date) {
    const url = `${apiHost}/x-departures/${origin}/${destination}/${date}`;
    return doFetch(url);
  },

  poll: function(origin, destination, date, index) {
    const url = `${apiHost}/x-departures/${origin}/${destination}/${date}/poll?index=${index}`;
    return doFetch(url);
  },

  mockFetch: function() {
    return [
      {
        origin: "George Washington Bridge Bus Station",
        destination: "Gare d'autocars de Montréal",
        departureTime: "13:30",
        arrivalTime: "15:30",
        price: 15.23,
        currency: "€"
      }, {
        origin: "George Washington Bridge Bus Station",
        destination: "Gare d'autocars de Montréal",
        departureTime: "16:30",
        arrivalTime: "18:30",
        price: 17.23,
        currency: "€"
      }, {
        origin: "George Washington Bridge Bus Station",
        destination: "Gare d'autocars de Montréal",
        departureTime: "16:30",
        arrivalTime: "18:30",
        price: 17.23,
        currency: "€"
      }, {
        origin: "George Washington Bridge Bus Station",
        destination: "Gare d'autocars de Montréal",
        departureTime: "16:30",
        arrivalTime: "18:30",
        price: 17.23,
        currency: "€"
      }, {
        origin: "George Washington Bridge Bus Station",
        destination: "Gare d'autocars de Montréal",
        departureTime: "16:30",
        arrivalTime: "18:30",
        price: 17.23,
        currency: "€"
      }, {
        origin: "George Washington Bridge Bus Station",
        destination: "Gare d'autocars de Mont réal",
        departureTime: "16:30",
        arrivalTime: "18:30",
        price: 17.23,
        currency: "€"
      }, {
        origin: "George Washington Bridge Bus Station",
        destination: "Gare d'autocars de Montréal",
        departureTime: "16:30",
        arrivalTime: "18:30",
        price: 17.23,
        currency: "€"
      }, {
        origin: "George Washington Bridge Bus Station",
        destination: "Gare d'autocars de Montréal",
        departureTime: "16:30",
        arrivalTime: "18:30",
        price: 17.23,
        currency: "€"
      }, {
        origin: "George Washington Bridge Bus Station",
        destination: "Gare d'autocars de Montréal",
        departureTime: "16:30",
        arrivalTime: "18:30",
        price: 17.23,
        currency: "€"
      }
    ]
  }
};

export default fetcher;