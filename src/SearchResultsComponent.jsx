import React from 'react';

class SearchResultsComponent extends React.Component {
	render() {
		return (
			<div className="searchResults uk-width-1-2 uk-container-center">
				{this.props.departures.map((departure)=>
					<div key={departure.id} className="searchResultItem uk-panel uk-panel-box uk-width-1-1">
						<img src={departure.operatorImage} alt={departure.operatorName} className="uk-float-left uk-vertical-align-middle"/>
						<p><span className="uk-panel-title">{departure.departureTime}</span> {departure.originLocation}</p>
						<p><span className="uk-panel-title">{departure.arrivalTime}</span> {departure.destinationLocation}</p>
						<p className="price uk-float-right uk-position-top-right">{departure.price}<sup>{departure.currency}</sup></p>
					</div>
				)}
			</div>
		)
	}
};

export default SearchResultsComponent;