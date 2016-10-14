import React     from 'react';
import moment    from 'moment';
import Departure from './Departure.jsx';

class DepartureList extends React.Component {

	constructor(props) {
		
		super(props);
		this.state = { };
		
	}
  
	render() {
		
		var departures = this.props.data.departures.map(function(departure) {
			return (
				<Departure key={departure.id} data={departure} config={this.props.config}/>
			);
		}.bind(this));
		
		return (
			<div className="DepartureList">
				{departures}
			</div>
		);
	}
}

export default DepartureList;