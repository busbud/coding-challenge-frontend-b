var React = require('react');
var BusSchedule = require('./BusSchedule');
var TableHeading = require('./TableHeading');
var ShowLink = require('./ShowLink');
var axios = require('axios');
import {Jumbotron, Button, Table, Grid, Row, Col} from 'react-bootstrap'; //bootstrap for responsive design

/*ToDo Look into caching
        Look into polling
        https://davidwalsh.name/fetch for caching
*/

var App = React.createClass({
  getInitialState: function(){
    return{
      data: [],
      showHeading: false,
      showLink: false ,
      displayInFrench: false
    }
  },
  displayInFrench: function(){
    var _this = this;
    _this.setState({
       displayInFrench: !_this.state.displayInFrench
    });
  },
  loadData: function(){
    var _this = this;
    axios.request({
      url: 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-07-29?adult=1&lang=en&currency=USD', // 
      method: 'get',                                                                                     // 
      headers: {                                                                                         //
        'Content-Type': 'application/json',                                                               //
        'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',        //
        'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
        }
    }).then(function(results){
      var locations = {};
      for(var i = 0; i < results.data.locations.length; i++){
          locations[results.data.locations[i].id] = results.data.locations[i].name;   //Make an object storing the location's id with their name as name value pairs
      }
      var information; //collect individual characteristics such as departureTime, arrivalTime, price, etc. into this object
      var data = []; //final array to push onto the state of data
      for(i = 0; i < results.data.departures.length; i++){
        information = {};  //Set equal to empty object so it doesn't affect the data array
        information.departureTime = new Date(results.data.departures[i].departure_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});  //Convert the times to human readable times
        information.arrivalTime = new Date(results.data.departures[i].arrival_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        information.price = (results.data.departures[i].prices.total/100).toFixed(2); //Divide the price by 100 and make it fixed to 2 decimal places
        information.locationName = locations[results.data.departures[i].origin_location_id]; //Determine the location name from the locations object
        console.log(information);
        data.push(information);
      }
      console.log(data);
      _this.setState({
        data: data,
        showHeading: true,
        showLink: true
      });
    });
  },
  render: function(){
    var _this = this;
      if(_this.state.displayInFrench === false){
        return (
          <div>
          <Jumbotron>
            <h1>Hello New Yorker!</h1>
            <p>This is a simple website that allows you to search for trips by bus on
            July 29, 2017 to Montreal for the Osheaga festival! Click the button
            Load Times to see schedule that best fits your time and needs!</p>
            <p><Button bsStyle = "success" onClick = {this.loadData}>Load Times</Button></p>
            <a href = "#" onClick = {_this.displayInFrench}>Fr</a>
            <br />
            <ShowLink show = {_this.state.showLink} displayInFrench = {_this.state.displayInFrench}/>
          </Jumbotron>
          <Grid>
            <Row className = "show-grid">
              <Col xs={12} md = {9}>
                <Table striped bordered condensed hover>
                <TableHeading show = {_this.state.showHeading} displayInFrench = {_this.state.displayInFrench}/>    {/*Render just the heading of the table*/}
                <tbody>
                  {_this.state.data.map(function(row, i){
                    return <BusSchedule departureTime = {row.departureTime} arrivalTime = {row.arrivalTime}
                    locationName = {row.locationName} price = {row.price} key = {i}/>
                   })}
                </tbody>

                </Table>
            </Col>
            </Row>
          </Grid>
          </div>
        );
    }else{
      return (
          <div>
          <Jumbotron>
            <h1>Bonjour!</h1>
            <p>
            Il s'agit d'un simple site Web qui vous permet de rechercher des voyages en bus sur
            29 juillet 2017 à Montréal pour le festival Osheaga! Cliquez sur le bouton
            Aller pour voir l'horaire qui correspond le mieux à votre temps et à vos besoins!</p>
            <p><Button bsStyle = "success" onClick = {this.loadData}>Aller</Button></p>
            <a href = "#" onClick = {_this.displayInFrench}>En</a>
            <br />
            <ShowLink show = {_this.state.showLink} displayInFrench = {_this.state.displayInFrench}/>
          </Jumbotron>
          <Grid>
            <Row className = "show-grid">
              <Col xs={12} md = {9}>
                <Table striped bordered condensed hover>
                <TableHeading show = {_this.state.showHeading} displayInFrench = {_this.state.displayInFrench}/>    {/*Render just the heading of the table*/}
                {<tbody>
                  {_this.state.data.map(function(row, i){
                    return <BusSchedule departureTime = {row.departureTime} arrivalTime = {row.arrivalTime}
                    locationName = {row.locationName} price = {row.price} key = {i}/>
                   })}
                </tbody>}
                </Table>
            </Col>
            </Row>
          </Grid>
          </div>
        );
    }
  }
});

module.exports = App;
