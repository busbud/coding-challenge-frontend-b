import React from 'react';

class SearchResultsComponent extends React.Component {
	render() {
		return (
			<div className="searchResults uk-width-small-1-1 uk-width-large-1-2 uk-container-center">
				{this.props.departures.map((departure)=>
					<div key={departure.id} className="searchResultItem uk-panel uk-panel-box uk-width-1-1">
						<div className="uk-float-left uk-flex uk-flex-middle carrier-box">
							<img src={departure.operatorImage} alt={departure.operatorName}/>
							</div>

						<div className="time-box uk-float-left uk-flex uk-flex-middle">
							<div>
								<p><b className="uk-panel-title big">{departure.departureTime}</b> {departure.originLocation}</p>
								<p><b className="uk-panel-title">{departure.arrivalTime}</b> {departure.destinationLocation}</p>
							</div>
						</div>

						<div className="uk-float-right price-box uk-flex uk-flex-middle uk-flex-center">
							<p className="price">${departure.price}<sup>{departure.currency}</sup></p>
						</div>
					</div>
				)}
			</div>
		)
	}
};

export default SearchResultsComponent;