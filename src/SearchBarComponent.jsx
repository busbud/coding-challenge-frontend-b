import React from 'react';
import osheagaLogo from './osheaga-2013_WHITE.png';

class SearchBarComponent extends React.Component {

	handleChange(event){
		console.log({value: event.target.value});
	}

	render() {
		console.log('render search')
		return (
			<div className="uk-width-1-2 uk-form">
				<img src={osheagaLogo} className="App-logo uk-container-center" alt="Osheaga"/>


				<div className="uk-grid">
					<div className="uk-width-1-2 uk-row-first uk-form-controls">
						<input type="text"
							id="origin"
							defaultValue={this.props.origin}
							className="uk-width-1-1"
							onChange={this.handleChange}
						/>
					</div>
					<div className="uk-width-1-2 uk-form-controls">
						<input type="text"
							id="destination"
							defaultValue={this.props.destination}
							className="uk-width-1-1"
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="uk-grid">
					<div className="uk-width-2-3 uk-row-first uk-form-icon uk-form-controls">
						<i className="uk-icon-calendar"></i>
						<input type="text"
							id="datepicker"
							defaultValue={this.props.date}
							className="uk-width-1-1"
							onChange={this.handleChange}
						/>
					</div>
					<div className="uk-width-1-3 uk-form-controls">
						<input type="text"
							id="adults"
							defaultValue={this.props.adults+' passenger'}
							className="uk-width-1-1"
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="uk-grid">
					<div className="uk-width-1-1 uk-row-first">
						<a id="searchSubmit"onClick={(event) => this.props.searchHandler(event)} className="uk-width-1-1 uk-button uk-row-first"> <i className={'uk-icon-' + (this.props.loading ? 'spinner uk-icon-spin' : 'bus')}></i> Search for buses</a>
					</div>
				</div>
			</div>
		)
	}
};

export default SearchBarComponent;