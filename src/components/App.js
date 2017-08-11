import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchBarComponent from './SearchBarComponent';
import SearchResultComponent from './SearchResultComponent';

class App extends React.Component {

	constructor(){
		super();
		const defaultDeparture = "New York";
		const defaultDestination = "Montreal";
		const defaultDate = new Date(2018,9,2);
		const defaultAdults = 1;

		this.state = {
			departure: defaultDeparture,
			destination: defaultDestination,
			date: defaultDate,
			adults: defaultAdults,
		}
	}

	render() {
		return (
			<MuiThemeProvider>
				<div>
					<div id="header">
						<img src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png"/>
						<SearchBarComponent 
							departure={this.state.departure}
							destination={this.state.destination}
							date={this.state.date}
							adults={this.state.adults}
						/>
					</div>
					<SearchResultComponent/>
				</div>
			</MuiThemeProvider>
		)
	}
};

export default App;