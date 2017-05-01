var React = require('react');
var BusSchedule = require('./BusSchedule');
var axios = require('axios');
import {Jumbotron, Button} from 'react-bootstrap';

/*ToDo Look into caching
        Look into polling
*/

var App = React.createClass({
  getInitialState: function(){
    return{
      departureTimes: [],
      arrivalTimes: [],
      locationNames: [],
      prices: []
    }
  },
  componentDidMount: function(){
    var _this = this;
    axios.request({
      url: 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-07-29?adult = 1&lang=en&currency=USD',
      method: 'get',
      headers: {
        'Content-Type': 'application/json', 
        'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
        'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
        }
    }).then(function(results){
      var locations = [];
      for(var i = 0; i < results.data.locations.length; i++){
        locations.push(results.data.locations[i]);
      }
      console.log(results.data);
      var departureTimes = [], arrivalTimes = [], locationNames = [], prices = [];
      for(i = 0; i < results.data.departures.length; i++){
        departureTimes.push(results.data.departures[i].departure_time);
        arrivalTimes.push(results.data.departures[i].arrival_time);
        prices.push(results.data.departures[i].prices.total);
        //locationNames.push(results.data.departures.origin_location_id); //push id's for now
        for(var j = 0; j < locations.length; j++){
          if(locations[j].id === results.data.departures[i].origin_location_id){
            locationNames.push(locations[j].name);
            break; //break out of this for loop since there is no point in continuing
          }
        }
      }
      _this.setState({
        departureTimes: departureTimes,
        arrivalTimes: arrivalTimes,
        locationNames: locationNames,
        prices: prices
      });
    });
  },
  render: function(){
    return (
      <Jumbotron>
        <h1>Hello New Yorker!</h1>
        <p>This is a simple website that allows you to search for trips by bus on
        July 29, 2017 to Montreal for the Osheaga festival! Click the button
        Load Times to see schedule that best fits your time and needs!</p>
        <p><Button bsStyle = "success">Load Times</Button></p>
      </Jumbotron>
    );
  }
});

module.exports = App;
