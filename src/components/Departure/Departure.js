var React = require('react');
var Card =require('material-ui/lib/card/card');
var CardHeader = require('material-ui/lib/card/card-header');
require('./Departure.less');

var Departure = React.createClass({
  render: function() {
    return (
      <div className="departureContainer">
        <Card>
          <CardHeader
            title="From To"
            subtitle="Details"
            showExpandableButton={false}
            actAsExpander={false}
          />
        </Card>
      </div>
    );
  }
});

module.exports = Departure;
