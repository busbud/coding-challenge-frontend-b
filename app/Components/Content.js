var React = require('react');
var moment = require('moment');
var API_URL = "https://napi.busbud.com/x-departures/dr5reg/f25dvk/2016-01-14";
var miniBusPic = require('../Assets/bus.png');
var BusButtonLoading = require('./Bus-Button-Loading');
var Departures = require('./Departures');


module.exports = React.createClass({
  displayName: 'Content',

  getInitialState: function() {
    return {
      travelData: {
        departures: [],
        locations: [],
        operators: []
      }
    }
  },

  initiateSearch: function() {
    this.requestTravelData(API_URL);
  },

  requestTravelData: function(url) {
    var xhr = new XMLHttpRequest();
    var actualURL = url===API_URL ? API_URL+'?adult=1&currency=usd' : url+'&adult=1&currency=usd';
    xhr.open('get', actualURL, true);
    xhr.setRequestHeader('Accept', 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/');
    xhr.onload = () => {
      var newData = JSON.parse(xhr.responseText);
      var currentData = url===API_URL ? newData : this.state.travelData;
      if(currentData.complete){
        this.setState({ travelData: currentData });
        this.setState({ showLoading: false });
        return;
      } 
      currentData.operators = currentData.operators.concat(newData.operators);
      currentData.departures = currentData.departures.concat(newData.departures);
      currentData.complete = newData.complete;
      this.setState({ travelData: currentData });
      console.log(currentData);
      this.requestTravelData(API_URL + '/poll?index=' + currentData.departures.length)
    }
    xhr.send();
  },

  render: function () {
    return (
      <div className="content-container">
        <div className="page-permanent-announcement">{'Hey New York! Busbud wants to get you to Igloofest.'}</div>
        <BusButtonLoading initiateSearch={this.initiateSearch} />
        <Departures travelData={this.state.travelData}/>
      </div>
    );
  }

});