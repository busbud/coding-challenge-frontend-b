import React from 'react';
import osheagaLogo from './osheaga-2013_WHITE.png';
import './SearchBarComponent.css'

class SearchBarComponent extends React.Component {
	render() {
		return (
			<div>
				<div className="Form-Row center">
					<img src={osheagaLogo} className="App-logo" alt="Osheaga"/>
				</div>
				<div className="Form-Row justify">
					<input type="text"
						id="origin"
						value={this.props.origin}
						readOnly={true}
					/><br/>
					<input type="text"
						id="destination"
						value={this.props.destination}
						readOnly={true}
					/>
				</div>
				<div className="Form-Row justify">
					<input type="text"
						id="datepicker"
						value={this.props.date}
						readOnly={true}
					/>
					<input type="text"
						id="adults"
						value={this.props.adults+' passenger'}
						readOnly={true}
					/>
				</div>
				<div className="Form-Row">
					<button id="searchSubmit"onClick={(event) => this.props.searchHandler(event)}>Go!</button>
				</div>
			</div>
		)
	}
};

export default SearchBarComponent;