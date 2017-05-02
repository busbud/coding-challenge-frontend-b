var React = require('react');
var BusSchedule = require('./BusSchedule');
var TableHeading = require('./TableHeading');
var axios = require('axios');
import {Jumbotron, Button, Table} from 'react-bootstrap';

/*ToDo Look into caching
        Look into polling
*/

var App = React.createClass({
  getInitialState: function(){
    return{
      data: [],
      showHeading: false 
    }
  },
  loadData: function(){
    var _this = this;
    axios.request({
      url: 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-07-29?adult=1&lang=en&currency=USD',
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
      var information; //collect individual characteristics such as departureTime, arrivalTime, price, etc. into this object
      var data = []; //final array to push onto the state of data
      for(i = 0; i < results.data.departures.length; i++){
        information = {};  //Set equal to empty object
        information.departureTime = new Date(results.data.departures[i].departure_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        information.arrivalTime = new Date(results.data.departures[i].arrival_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        information.price = (results.data.departures[i].prices.total/100).toFixed(2);
        information.locationName = locations[results.data.departures[i].origin_location_id];
        console.log(information);
        data.push(information);
      }
      console.log(data);
      _this.setState({
        data: data,
        showHeading: true
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
        <p><Button bsStyle = "success" onClick = {this.loadData}>Load Times</Button></p>
      </Jumbotron>
      <Table striped bordered condensed hover>
      <TableHeading show = {_this.state.showHeading}/>
      <tbody>
        {_this.state.data.map(function(row, i){
          return <BusSchedule departureTime = {row.departureTime} arrivalTime = {row.arrivalTime}
          locationName = {row.locationName} price = {row.price} key = {i}/>
         })}
      </tbody>
      </Table>
      </div>
    );
  }
});

module.exports = App;
