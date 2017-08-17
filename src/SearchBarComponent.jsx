import React from 'react';
import osheagaLogo from './osheaga-2013_WHITE.png';

class SearchBarComponent extends React.Component {
	render() {
		return (
			<div className="uk-width-1-2 uk-form">
				<img src={osheagaLogo} className="App-logo uk-container-center " alt="Osheaga"/>


				<div className="uk-grid">
					<div className="uk-width-1-2 uk-row-first">
						<input type="text"
							id="origin"
							value={this.props.origin}
							className="uk-width-1-1"
						/>
					</div>
					<div className="uk-width-1-2">
						<input type="text"
							id="destination"
							value={this.props.destination}
							className="uk-width-1-1"
						/>
					</div>
				</div>
				<div className="uk-grid">
					<div className="uk-width-2-3 uk-row-first uk-form-icon">
						<i className="uk-icon-calendar"></i>
						<input type="text"
							id="datepicker"
							value={this.props.date}
							className="uk-width-1-1"
						/>
					</div>
					<div className="uk-width-1-3">
						<input type="text"
							id="adults"
							value={this.props.adults+' passenger'}
							className="uk-width-1-1"
						/>
					</div>
				</div>
				<div className="uk-grid">
					<div className="uk-width-1-1 uk-row-first">
						<button id="searchSubmit"onClick={(event) => this.props.searchHandler(event)} className="uk-width-1-1 uk-botton uk-row-first">Go!</button>
					</div>
				</div>
			</div>
		)
	}
};

export default SearchBarComponent;