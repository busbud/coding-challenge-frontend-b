var React = require('react');	//BusSchedule component to return all rows for schedule

var BusSchedule = React.createClass({
	render: function(){
		return (
			<tr>
				<td>{this.props.departureTime}</td>
				<td>{this.props.arrivalTime}</td>
				<td>{this.props.locationName}</td>
				<td>{this.props.price}</td>
			</tr>
		);
	}
});

module.exports = BusSchedule;
