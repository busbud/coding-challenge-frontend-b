import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class SearchBarComponent extends React.Component {
	constructor(){
		super()
		this.state={
			style:{
				margin: "12px"
			}
		}
	}

	render() {
		return (
			<div>
				<TextField
					id="origin"
					label="Origin"
					value={this.props.origin}
					disabled={true}
					style={this.state.style}
				/><br/>
				<TextField
					id="destination"
					label="Destination"
					value={this.props.destination}
					disabled={true}
					style={this.state.style}
				/>
				<DatePicker
					id="datepicker"
					label="Date"
					value={this.props.date}
					disabled={true}
					style={this.state.style}
				/>
				<SelectField
					id="adults"
					label="Adults"
					value={this.props.adults}
					disabled={true}
					style={this.state.style}
				>
					<MenuItem value={1} primaryText="1" />
					<MenuItem value={2} primaryText="2" />
					<MenuItem value={3} primaryText="3" />
					<MenuItem value={4} primaryText="4" />
				</SelectField><br/>
				<RaisedButton label="Go!" style={this.state.style} onClick={(event) => this.props.searchHandler(event)}/>

			</div>
		)
	}
};

export default SearchBarComponent;