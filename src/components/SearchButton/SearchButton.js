var React = require('react');
var FlatButton = require('material-ui/lib/flat-button');
var MapsDirectionsBus = require('material-ui/lib/svg-icons/maps/directions-bus');
var ReactDOM = require('react-dom');
var CircularProgress = require('material-ui/lib/circular-progress');
var Schedule = require('../Schedule/Schedule');
require('./SearchButton.less');

// combines the data from the 3 sources - cities, locations and departures - into a single data object
var combineData = function(cities, locations, departures) {
  var data = [];
  var oName, oCity, dName, dCity;
  departures.forEach(function(dep) {
    oName = "";
    oCity = "";
    dName = "";
    dCity = "";

    // searches the origin location location by id:
    locations.forEach(function(loc) {
      if(loc.id == dep.origin) {
        oName = loc.name;
        // searches the origin city by id:
        cities.forEach(function(c) {
          if(c.id == loc.city) {
            oCity = c.name
          }
        });
      }
    });

    // searches the destination location by id:
    locations.forEach(function(loc) {
      if(loc.id == dep.destination) {
        dName = loc.name;
        // searches the destination city by id:
        cities.forEach(function(c) {
          if(c.id == loc.city) {
            dCity = c.name
          }
        });
      }
    });

    data.push({
      price: dep.price,
      wifiColor: dep.wifiColor,
      powerColor: dep.powerColor,
      tvColor: dep.tvColor,
      legroomColor: dep.legroomColor,
      toiletColor: dep.toiletColor,
      originName: oName,
      originCity: oCity,
      destinationName: dName,
      destinationCity: dCity,
      departureTime: dep.departureTime,
      arrivalTime: dep.arrivalTime
    });
  });
  return data;
}

// utility function to handle recursive calls:
var handleSearchUtil = function(cities, locations, departures, index) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if(req.readyState == 4 && req.status == 200) {
      var respData = JSON.parse(req.responseText);

      // populates the arrays with data:

      respData.departures.forEach(function(dep) {
        departures.push({
          price: "$" + dep.prices.total.toString().slice(0, -2),
          wifiColor: dep.amenities.wifi ? "black" : "#E6E6E6",
          powerColor: dep.amenities.power_outlets ? "black" : "#E6E6E6",
          tvColor: dep.amenities.tv ? "black" : "#E6E6E6",
          legroomColor: dep.amenities.leg_room ? "black" : "#E6E6E6",
          toiletColor: dep.amenities.toilet ? "black" : "#E6E6E6",
          origin: dep.origin_location_id,
          destination: dep.destination_location_id,
          departureTime: dep.departure_time.slice(-8, -3),
          arrivalTime: dep.arrival_time.slice(-8, -3)
        });
      });

      respData.cities.forEach(function(city) {
        cities.push({
          id: city.id,
          name: city.name
        });
      });

      respData.locations.forEach(function(loc) {
        locations.push({
          id: loc.id,
          city: loc.city_id,
          name: loc.name
        });
      });

      if(respData.complete) {
        ReactDOM.render(<Schedule departures={combineData(cities, locations, departures)} />, document.getElementById('scheduleContainer'));
        if(window.matchMedia("(min-width: 992px)")) {
          window.scrollTo(0, 450);
        }
      } else {
        handleSearchUtil(cities, locations, departures, respData.ttl);
      }
    }
  }
  req.open("GET", "https://napi.busbud.com/x-departures/dr5reg/f25dvk/2016-02-05?adult=1&child=0&senior=0&lang=us&currency=usd&index=" + index, true);
  req.setRequestHeader("Accept", "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/");
  req.send();
}

var SearchButton = React.createClass({
  render: function() {
    return (
      <div className="searchButtonContainer">
        <FlatButton className="searchButton"
          backgroundColor="#137CCB"
          rippleColor="#283593"
          hoverColor="#2196F3"
          icon={<MapsDirectionsBus />}
          labelPosition="before"
          onClick={this.handleSearch}
          children={this.props.child} />
      </div>
    );
  },
  handleSearch: function(event) {
    var citiesData = [];
    ReactDOM.render(<CircularProgress size={2} className="scheduleSpinner" />, document.getElementById('scheduleContainer'));
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if(req.readyState == 4 && req.status == 200) {
        var respData = JSON.parse(req.responseText);

        // populates the arrays with data:

        var departures = [];
        respData.departures.forEach(function(dep) {
          departures.push({
            price: "$" + dep.prices.total.toString().slice(0, -2),
            wifiColor: dep.amenities.wifi ? "black" : "#E6E6E6",
            powerColor: dep.amenities.power_outlets ? "black" : "#E6E6E6",
            tvColor: dep.amenities.tv ? "black" : "#E6E6E6",
            legroomColor: dep.amenities.leg_room ? "black" : "#E6E6E6",
            toiletColor: dep.amenities.toilet ? "black" : "#E6E6E6",
            origin: dep.origin_location_id,
            destination: dep.destination_location_id,
            departureTime: dep.departure_time.slice(-8, -3),
            arrivalTime: dep.arrival_time.slice(-8, -3)
          });
        });

        var cities = [];
        respData.cities.forEach(function(city) {
          cities.push({
            id: city.id,
            name: city.name
          });
        });

        var locations = [];
        respData.locations.forEach(function(loc) {
          locations.push({
            id: loc.id,
            city: loc.city_id,
            name: loc.name
          });
        });

        if(respData.complete) {
          ReactDOM.render(<Schedule departures={combineData(cities, locations, departures)} />, document.getElementById('scheduleContainer'));
          if(window.matchMedia("(min-width: 992px)")) {
            window.scrollTo(0, 450);
          }
        } else {
          handleSearchUtil(cities, locations, departures, respData.ttl);
        }
      }
    };
    req.open("GET", "https://napi.busbud.com/x-departures/dr5reg/f25dvk/2016-02-05?adult=1&child=0&senior=0&lang=us&currency=usd", true);
    req.setRequestHeader("Accept", "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/");
    req.send();
  }
});

module.exports = SearchButton;
