import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchBarComponent from './SearchBarComponent';
import SearchResultComponent from './SearchResultComponent';
import axios from 'axios';

class App extends React.Component {

	constructor(){
		super();

		this.state = {
			origin: "New York",
			destination: "Montreal",
			date: new Date(2018,9,2),
			adults: 1,
			expiration: Date.now()
		}

		this.loading = false;
		this.departures = [];
	}

	searchHandler(event) {
		//curl - H "Accept: application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/" - H "X-Busbud-Token:PARTNER_JSWsVZQcS_KzxNRzGtIt1A" https: //napi.busbud.com/x-departures/dr5reg/f25dvk/2018-02-07\?adult\=1
		
		//if(this.expiration <= Date.now()){
			var poll = setInterval(()=>{
				if(this.loading || (this.departures && !this.departures.length)){
					this.getData();
				}else{
					clearInterval(poll);
				}
			},2000)
		//}
	}

	getData() {
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
			if(response.status == 200 && response.data.is_valid_route === true){
				if(response.data.complete === true){
					this.setState({loading:false, expiration : new Date(Date.now() + (response.data.ttl*1000))});
					this.filterData(response.data);
				}
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	filterData(data){
		var results = [];
		for(departure of data.departures){
			results.push({
				departureTime: departure.departure_time,
				arrivalTime: arrival.arrival_timezone,
				originLocation: results.locations.find((location) => location.id === departure.origin_location_id),
				destinationLocation: results.locations.find((location) => location.id === departure.desination_location_id),
				price: results.prices.total+' '+results.prices.currency
			})
		}

		this.departures= results;
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
						loading={this.loading}
						data={this.departures}
						/>
				</div>
			</MuiThemeProvider>
		)
	}
};

export default App;