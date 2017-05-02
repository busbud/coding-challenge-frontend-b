var React = require('react');

var TableHeading = React.createClass({
	render: function(){
		if(this.props.show === true){
			return (
			<thead>
        		<tr>
          			<th>Departure Time</th>
          			<th>Arrival Time</th>
          			<th>Location Name</th>
          			<th>Price $ USD</th>
        		</tr>
      		</thead>
		);
		}else{
			return (<thead></thead>);
		}
		
	}
});

module.exports = TableHeading;
