var React = require('react');		//JSX for returning French or English table headers

var TableHeading = React.createClass({
	render: function(){
		if(this.props.show === true){
			if(this.props.displayInFrench === false){
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
				return (
						<thead>
			        		<tr>
			          			<th>Heure de départ</th>
			          			<th>Heure d'arrivée</th>
			          			<th>Nom de la localisation</th>
			          			<th>Prix $ USD</th>
			        		</tr>
			      		</thead>
					);
			}
		
		}else{
			return (null);
		}
	}
});

module.exports = TableHeading;
