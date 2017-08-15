import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchBarComponent from './SearchBarComponent';
import SearchResultComponent from './SearchResultComponent';
import axios from 'axios';

class App extends React.Component {

	constructor(){
		super();
		const defaultOrigin = "New York";
		const defaultDestination = "Montreal";
		const defaultDate = new Date(2018,9,2);
		const defaultAdults = 1;

		this.state = {
			origin: defaultOrigin,
			destination: defaultDestination,
			date: defaultDate,
			adults: defaultAdults,
			loading: false,
			departures: []
		}
	}

	searchHandler(event) {
	//curl - H "Accept: application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/" - H "X-Busbud-Token:PARTNER_JSWsVZQcS_KzxNRzGtIt1A" https: //napi.busbud.com/x-departures/dr5reg/f25dvk/2018-02-07\?adult\=1

		// validate params / get hashes from origin/destination?
		console.log(event);		
		
		// update SearchResutlComponent with spinner

		axios({
			url: 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2018-02-07',
			method: 'get',
			data: {
				adult: 1
			},
			headers: {
				'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
				'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
			}
		})
		.then(function (response) {
			console.log(response);
			if(response.data.code == 200){
				// update SearchResutlComponent with results
			}
		})
		.catch(function (error) {
			console.log(error);
			// update SearchResutlComponent with error
		});
	}

	render() {
		return (
			<MuiThemeProvider>
				<div>
					<div id="header">
						<img src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png"/>
						<SearchBarComponent 
							origin={this.state.origin}
							destination={this.state.destination}
							date={this.state.date}
							adults={this.state.adults}
							searchHandler={this.searchHandler}
						/>
					</div>
					<SearchResultComponent
						loading={this.state.loading}
						/>
				</div>
			</MuiThemeProvider>
		)
	}
};

export default App;