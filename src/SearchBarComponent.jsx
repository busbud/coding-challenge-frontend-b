import React from 'react';

class SearchBarComponent extends React.Component {
	render() {
		return (
			<div>
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
				<input type="text"
					id="datepicker"
					value={this.props.date}
					readOnly={true}
				/>
				<select
					id="adults"
					value={this.props.adults}
					readOnly={true}
				>
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
					<option value={4}>4</option>
				</select>
				<button id="searchSubmit"onClick={(event) => this.props.searchHandler(event)}>Go!</button>
			</div>
		)
	}
};

export default SearchBarComponent;