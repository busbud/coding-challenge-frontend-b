var express = require('express');
var app = express();
const request = require('request');

var port = process.env.PORT || 8080;

/******************
 * MOCKED
 *****************/
if(!process.env.ENV === 'DEV') {
  app.use('/busbud', function (req, res) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    var mockedData = require('./mock/results.json')
    setTimeout(function () {
      res.send(mockedData);
    }, 1)
  });
}else{

  if(!process.env.BUSBUD_TOKEN){
    throw new Error("Missing BUSBUD_TOKEN");
  }

  app.use('/busbud', function(req, res){

    // Manual proxy: https://stackoverflow.com/questions/38332492/add-custom-headers-to-request
    let url = 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2018-08-02';

    req.headers['Accept'] = 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/';
    req.headers['X-Busbud-Token'] = process.env.BUSBUD_TOKEN;

    req.pipe(request(url)).pipe(res)
  })

}

// Fetching the root will return the built in version of the client
app.use('/', express.static(__dirname + '/../client/build'));

// Fetching anything else will return the client
app.use(express.static(__dirname + '/../client/build'));

app.listen(port, () => console.log('Listening to the port '+port))