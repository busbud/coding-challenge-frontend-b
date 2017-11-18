var express = require('express');
var app = express();

// Busbud API enrichement and proxy
// app.use('/busbud', proxy('https://napi.busbud.com'));

/******************
 * MOCKED
 *****************/
// @TODO This should be just for development mode
app.use('/busbud', function(req, res){
  res.header('Access-Control-Allow-Origin' , 'http://localhost:3000' );
  var mockedData = require('./mock/results.json')
  setTimeout(function(){res.send(mockedData);}, 1)

});
/******************
 * END MOCKED
 *****************/


// Production Env
app.use(express.static('build'))

app.listen(8080, () => console.log('Example app listening on port 8080!'))

/**
 * Expected state:
 *

 {
 	selectedDepartures: geohash,
 	departures: {
 		isFetching: true,
		items: []
 	},
 	selectedDestination: geohash,
 	destinations: {
 		isFetching: false,
 		lastUpdated: 1439478405547,
		items: [
			{
				...
			}
		]
 	}
 }

 *
 *
 */