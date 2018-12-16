import React, { Fragment, Component } from 'react';
import { requestToApi } from 'react-data-fetching';
import { Flex, Box } from 'rebass';
import { Container, Loader, HeroBanner, ResultCard } from './ui-components';

const date = '2019-08-02';
const API = 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/' + date + '?adult=1';
const HEADERS = {
  "Accept": "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
  "X-Busbud-Token": 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
};

class Results extends Component {
	state = {
		locations: [],
		cities: [],
		departures: [],
		loading: true,
		originCity: '',
		destinationCity: '',
		complete: false,
	}

	componentDidMount() {
		this.fetchData();
	}
	shouldComponentUpdate() {
		if( this.state.complete === false ) {
			this.fetchData();
			return true;
		}
	}

	fetchData = () => {
		requestToApi({
			url: API,
			headers: HEADERS,
			method: 'GET',
			onTimeout: () => console.log('⏱️ Timeout!'),
			onProgress: (progression) => ('♻️ Progressing...', progression),
			timeout: 5000,
		}).then(response => this.setState(() => ({ 
				departures: response.data.departures, 
				cities: response.data.cities, 
				locations: response.data.locations,
				complete: response.data.complete,
				originCity: (response.data.cities.filter((city) => {
					return response.data.origin_city_id === city.id
				})),
				destinationCity: (response.data.cities.filter((city) => {
					return response.data.destination_city_id === city.id
				})),
				loading: false
			 })
			))
	}

    render() {
        return (
					<Fragment>
						{!this.state.loading && (
							<HeroBanner 
							title={'Your search results for: ' + date + ' to ' +  this.state.destinationCity[0].name}
							image={this.state.destinationCity[0].image_url}
							/>
						)}
						<Container>
							{this.state.loading ? <Loader /> : (
								<Flex flexWrap='wrap'>
									{this.state.departures.map((journey, i) => {
										let departingStop;
										let arrivingStop;
										//We go filter through the locations array to find the location that matches
										//out id for both arrival and departure
										departingStop = this.state.locations.filter((a) => {
											return a.id === journey.origin_location_id
										});
										arrivingStop = this.state.locations.filter((a) => {
											return a.id === journey.destination_location_id
										});

										return (
											<Box
												my={3}
												width={[1, 6/12]}
											>
												<ResultCard 
													key={i}
													title={this.state.originCity[0].name + ' to ' + this.state.destinationCity[0].name}
													departure={new Date(journey.departure_time)}
													arrival={new Date(journey.departure_time)}
													price={(journey.prices.total / 100).toFixed(2)}
													currency={journey.prices.currency}
													depLocation={departingStop[0].name}
													arrLocation={arrivingStop[0].name}
												/>
											</Box>
										)}
									)}
								</Flex>						
							)}
						</Container>
					</Fragment>
        )
    }
}

export default Results;