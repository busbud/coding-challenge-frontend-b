const express = require('express');
const axios = require('axios');
require('dotenv').load();

const app = express();
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const base_url = process.env.BUSBUD_API;
const endpoint = 'x-departures';

const url = `${base_url}/${endpoint}`;
const headers = {
  headers: {
    Accept: process.env.ACCEPT,
    'X-Busbud-Token': process.env.X_BUSBUD_TOKEN
  }
};

let departuresIndex;

app.get('/api/departures', (req, res) => {
  departuresIndex = 0;

  axios
    .get(
      `${url}/${req.query.origin}/${req.query.destination}/${req.query.date}`,
      headers
    )
    .then(response => {
      console.log(response.data.complete);
      if (!response.data.complete) {
        departuresIndex = response.data.departures.length;
      }
      res.send({
        locations: response.data.locations,
        departures: response.data.departures,
        operators: response.data.operators,
        complete: response.data.complete
      });
    })
    .catch(err => console.log('Failed with error: ', err));
});

app.get('/api/departures/poll', (req, res) => {
  axios
    .get(
      `${url}/${req.query.origin}/${req.query.destination}/${
        req.query.date
      }/poll?index=${departuresIndex}`,
      headers
    )
    .then(response => {
      console.log(response.data.complete);
      if (!response.data.complete) {
        departuresIndex += response.data.departures.length;
        console.log(departuresIndex);
      }
      res.send({
        locations: response.data.locations,
        departures: response.data.departures,
        operators: response.data.operators,
        complete: response.data.complete
      });
    })
    .catch(err => console.log('Failed with error: ', err));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
