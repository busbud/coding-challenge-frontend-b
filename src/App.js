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
      /*departureTimes: [],
      arrivalTimes: [],
      locationNames: [],
      prices: []*/
      data: [] 
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
      var locations = {};
      for(var i = 0; i < results.data.locations.length; i++){
          locations[results.data.locations[i].id] = results.data.locations[i].name;
      }
      //console.log(locations);
      //console.log(results.data);
      var information = {};
      var data = [];
      //var departureTimes = [], arrivalTimes = [], locationNames = [], prices = [];
      for(i = 0; i < results.data.departures.length; i++){
        /*departureTimes.push(results.data.departures[i].departure_time);
        arrivalTimes.push(results.data.departures[i].arrival_time);
        prices.push(results.data.departures[i].prices.total);
        locationNames[i] = locations[results.data.departures[i].origin_location_id];*/
        information.departureTime = results.data.departures[i].departure_time;
        information.arrivalTime = results.data.departures[i].arrival_time;
        information.price = results.data.departures[i].prices.total;
        information.locationName = locations[results.data.departures[i].origin_location_id];
        console.log(information);
        data.push(information);
      }
      console.log(data);
      _this.setState({
        /*departureTimes: departureTimes,
        arrivalTimes: arrivalTimes,
        locationNames: locationNames,
        prices: prices*/
        data: data
      });
    });
  },
  render: function(){
    var _this = this;
    return (
      <div>
      <Jumbotron>
        <h1>Hello New Yorker!</h1>
        <p>This is a simple website that allows you to search for trips by bus on
        July 29, 2017 to Montreal for the Osheaga festival! Click the button
        Load Times to see schedule that best fits your time and needs!</p>
        <p><Button bsStyle = "success">Load Times</Button></p>
      </Jumbotron>
      <table>
      <thead>
        <tr>
          <th>Departure Time</th>
          <th>Arrival Time</th>
          <th>Location Name</th>
          <th>Price $ USD</th>
        </tr>
        </thead>
        <tbody>
          {_this.state.data.map(function(row, i){
            return <BusSchedule departureTime = {row.departureTime} arrivalTime = {row.arrivalTime}
            locationName = {row.locationName} price = {row.price} key = {i}/>
          })}
        </tbody>
      </table>
      </div>
    );
  }
});

module.exports = App;
