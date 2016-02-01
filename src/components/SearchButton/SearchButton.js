var React = require('react');
var FlatButton = require('material-ui/lib/flat-button');
var MapsDirectionsBus = require('material-ui/lib/svg-icons/maps/directions-bus');
var ReactDOM = require('react-dom');
var CircularProgress = require('material-ui/lib/circular-progress');
var Schedule = require('../Schedule/Schedule');
require('./SearchButton.less');

var SearchButton = React.createClass({
  render: function() {
    return (
      <div className="searchButtonContainer">
        <FlatButton className="searchButton"
          backgroundColor="#137CCB"
          rippleColor="#283593"
          hoverColor="#2196F3"
          icon={<MapsDirectionsBus />}
          label="Search with Busbud"
          labelPosition="after"
          onClick={this.handleSearch} />
      </div>
    );
  },
  handleSearch: function(event) {
    ReactDOM.render(<CircularProgress size={2} className="scheduleSpinner" />, document.getElementById('scheduleContainer'));
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if(req.status == 200 && req.readyState == 4) {
        var respData = JSON.parse(req.responseText);
        var priceStr = respData.departures[0].prices.total.toString();
        setTimeout(function() {
          ReactDOM.render(<Schedule departures={respData.departures} />, document.getElementById('scheduleContainer'));
          if(window.matchMedia("(min-width: 992px)")) {
            window.scrollTo(0, 600);
          }
        }, 1000); // simulating a bigger data set (temporary)
      }
    };
    req.open("GET", "https://napi.busbud.com/x-departures/dr5reg/f25dvk/2016-02-05?adult=1&child=0&senior=0&lang=us&currency=usd", true);
    req.setRequestHeader("Accept", "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/");
    req.send();
  }
});

module.exports = SearchButton;
