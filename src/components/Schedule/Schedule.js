var React = require('react');
var Departure = require('../Departure/Departure');
require('./Schedule.less');

var Schedule = React.createClass({
  render: function() {
    var departures = [];
    for(var i = 0; i < this.props.departures.length; i++) {
      departures.push(
        <Departure data={this.props.departures[i]} />
      );
    }
    return (
      <div className="scheduleContainer">
        {departures}
      </div>
    );
  }
});

module.exports = Schedule;
