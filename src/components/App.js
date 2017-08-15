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
			loading: false,
			departures: [],
			expiration: Date.now()
		}
	}

	searchHandler(event) {
		//curl - H "Accept: application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/" - H "X-Busbud-Token:PARTNER_JSWsVZQcS_KzxNRzGtIt1A" https: //napi.busbud.com/x-departures/dr5reg/f25dvk/2018-02-07\?adult\=1
		
		//if(this.expiration <= Date.now()){
			var poll = setInterval(()=>{
				if(this.state.loading || !this.state.departures.length){
					this.getData();
				}else{
					clearInterval(poll);
				}
			},500)
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
						// get departures and map locations to them + simply prices ?
					}
				}
			})
			.catch(function (error) {
				console.log(error);
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
						data={[{departure_time:'a',arrival_time:'b',location_name:'e',prices:{total:'c',currency:'d'}}]}
						/>
				</div>
			</MuiThemeProvider>
		)
	}
};

export default App;