var React = require('react');
var BusSchedule = require('./BusSchedule');
var TableHeading = require('./TableHeading');
var ShowLink = require('./ShowLink');
import {Jumbotron, Button, Table, Grid, Row, Col} from 'react-bootstrap'; //bootstrap for responsive design
import $ from 'jquery'; //using $ from jQuery for AJAX calls

var App = React.createClass({
  getInitialState: function(){
    return{
      data: [],                 //State variables
      showHeading: false,       //Controls heading of table
      showLink: false ,          //Controls heading to BusBud link
      displayInFrench: false     //display in French or not?
    }
  },
  displayInFrench: function(){
    this.setState({
       displayInFrench: !this.state.displayInFrench //flip the boolean displayInFrench to toggle between Fr and En
    });
  },
  loadData: function(){
    var _this = this; //assigning _this so it can be referenced within functions and hold the same context
    var information; //collect individual characteristics such as departureTime, arrivalTime, price, etc. into this object
    var data = []; //final array to push onto the state of data

    function getData(url){
      $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      cache: true,
      headers: {                                                                                         //Required headers for API call
        'Content-Type': 'application/json',                                                               //
        'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',        //
        'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
        },
      success: function(results){
       console.log(results.complete);
       if(results.complete === false){  //If results.complete is false, call getData again with the polling URL
        getData('https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-07-29/poll?adult=1&lang=en&currency=USD&index=0'); //Call the function again but with a new URL
       }
       else{
        var locations = {};
        for(var i = 0; i < results.locations.length; i++){
            locations[results.locations[i].id] = results.locations[i].name;   //Make an object storing the location's id with their name as name value pairs
        }
        for(i = 0; i < results.departures.length; i++){
          information = {};  //Set equal to empty object so it doesn't affect the data array
          information.departureTime = new Date(results.departures[i].departure_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});  //Convert the times to human readable times
          information.arrivalTime = new Date(results.departures[i].arrival_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          information.price = (results.departures[i].prices.total/100).toFixed(2); //Divide the price by 100 and make it fixed to 2 decimal places
          information.locationName = locations[results.departures[i].origin_location_id]; //Determine the location name from the locations object
          //console.log(information);
          data.push(information);
        }
        //console.log(data);
        _this.setState({
          data: data,
          showHeading: true,
          showLink: true
        });
      }
    }
  });
}
 getData('https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-07-29/?adult = 1&lang=en&currency=USD');   //Call getData to get the data
},
  render: function(){
      if(this.state.displayInFrench === false){ //render this JSX if user wants it in English
        return (
          <div>
          <Jumbotron>
            <h1>Hello New Yorker!</h1>
            <p>This is a simple website that allows you to search for trips by bus on
            July 29, 2017 to Montreal for the Osheaga festival! Click the button
            Load Times to see schedule that best fits your time and needs!</p>
            <p><Button bsStyle = "success" onClick = {this.loadData}>Load Times</Button></p>
            <a href = "#" onClick = {this.displayInFrench}>Fr</a>
            <br />
            <ShowLink show = {this.state.showLink} displayInFrench = {this.state.displayInFrench}/>
          </Jumbotron>
          <Grid>
            <Row className = "show-grid">
              <Col xs={12} md = {9}>
                <Table striped bordered condensed hover>
                <TableHeading show = {this.state.showHeading} displayInFrench = {this.state.displayInFrench}/>    {/*Render just the heading of the table*/}
                <tbody>
                  {this.state.data.map(function(row, i){
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
      return (    //render this JSX if user wants it in French
          <div>
          <Jumbotron>
            <h1>Bonjour Personne de New York!</h1>
            <p>
            Il s'agit d'un simple site Web qui vous permet de rechercher des voyages en bus sur
            29 juillet 2017 à Montréal pour le festival Osheaga! Cliquez sur le bouton
            Aller pour voir l'horaire qui correspond le mieux à votre temps et à vos besoins!</p>
            <p><Button bsStyle = "success" onClick = {this.loadData}>Aller</Button></p>
            <a href = "#" onClick = {this.displayInFrench}>En</a>
            <br />
            <ShowLink show = {this.state.showLink} displayInFrench = {this.state.displayInFrench}/>
          </Jumbotron>
          <Grid>
            <Row className = "show-grid">
              <Col xs={12} md = {9}>
                <Table striped bordered condensed hover>
                  <TableHeading show = {this.state.showHeading} displayInFrench = {this.state.displayInFrench}/>    {/*Render just the heading of the table*/}
                  {<tbody>
                    {this.state.data.map(function(row, i){
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
