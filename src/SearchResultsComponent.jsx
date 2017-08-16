import React from 'react';

class SearchResultsComponent extends React.Component {
	render() {
		return (
			<div>
				{this.props.departures.map((departure)=>
					<div key={departure.id}>
						<img src={departure.operatorImage} alt={departure.operatorName}/>
						<p><span>{departure.departureTime}</span>{departure.originLocation}</p>
						<p><span>{departure.arrivalTime}</span>{departure.destinationLocation}</p>
						<p>{departure.price}</p>
					</div>
				)}
			</div>
		)
	}
};

export default SearchResultsComponent;