import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import moment from 'moment';

import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import ja from 'react-intl/locale-data/ja';
import ko from 'react-intl/locale-data/ko';

import './style.css';
import banner from './banner.jpg';
import localeData from '../../locales/data.json';

addLocaleData([...en, ...fr, ...ja, ...ko]);

const language = (navigator.languages && navigator.languages[0]) ||
navigator.language ||
navigator.userLanguage;
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;

moment.locale(language);

class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
	  departures: null,
	  locations: null
		};
	}

	componentDidMount () {
		this.fetchDepartures();
	}

	render () {
		if (this.state.departures) {
	  return (
		<IntlProvider locale={language} messages={messages}>
		<div>
		  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
		  <Col xs={12} md={12}>
			<img src={banner} alt="banner" />
			<h3 className="text-center">New York &#8680; Montréal</h3>
			<h4 className="text-center">2017-07-29</h4>
		  </Col>
		  <Grid>
		    <Row className="show-grid">
				<Col xs={0} md={3}></Col>
				<Col xs={4} md={2}><h4>{ messages.time }</h4></Col>
				<Col xs={5} md={2}><h4>{ messages.location }</h4></Col>
				<Col xs={3} md={2}><h4>{ messages.price }</h4></Col>
				<Col xs={0} md={3}></Col>
		    </Row>
			{renderDepartures(this.state.departures, this.state.locations)}
		    <hr />
		  </Grid>
		</div>
		</IntlProvider>
	  );
		}

		return <div>Loading...</div>;
	}

	fetchDepartures (index) {
	// New York's geohash
		var origin = 'dr5reg';

	// Montréal's geohash
		var destination = 'f25dvk';
		var outbound_date = '2017-07-29';

		var adult = 1;
		var child = 0;
		var senior = 0;
		var lang = language;
		var currency = 'CAD';

		var path = origin + '/' + destination + '/' + outbound_date;
		if (index) {
			path += '/poll';
		}

		var query = '?adult=' + adult + '&child=' + child + '&senior=' + senior + '&lang=' + lang + '&currency=' + currency;
		var endpoint = 'https://napi.busbud.com/x-departures/' + path + query;

		fetch(endpoint, {
			method: 'GET',
			headers: {
	  'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
	  'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
			}
		})

	.then((response) => response.json())
	.then((responseJson) => {
		if (!responseJson.complete) {
			this.fetchDepartures(0);
		}

		responseJson.departures.sort(function (a, b) {
			if (moment(a.departure_time, 'YYYY-MM-DDTHH:mm:ss').isBefore(moment(b.departure_time, 'YYYY-MM-DDTHH:mm:ss'))) {
			    return -1;
			} else {
			    return 1;
			}
		});
		this.setState({
			departures: responseJson.departures,
			locations: responseJson.locations
		});
	})
	.catch((err) => {
		console.error(err);
	});
	}
}

function renderDepartures (departures, locations) {
	return departures.map(function (dept) {
		return (
			<div>
				<hr />
				<Row className="show-grid" key={dept.id}>
					<Col xs={0} md={3}></Col>
					<Col xs={9} md={4}>
						<Row className="show-grid">
							<Col xs={4} md={4}>{formatTime(dept.departure_time)}</Col>
							<Col xs={8} md={8}>{findLocation(locations, dept.origin_location_id)}</Col>
						</Row>
						<Row className="show-grid">
							<Col xs={4} md={4}>&#8681;</Col>
							<Col xs={8} md={8}></Col>
						</Row>
						<Row className="show-grid">
							<Col xs={4} md={4}>{formatTime(dept.arrival_time)}</Col>
							<Col xs={8} md={8}>{findLocation(locations, dept.destination_location_id)}</Col>
						</Row>
					</Col>
					<Col xs={3} md={2}><h4>{Math.floor(dept.prices.total / 100)}<sup>CAD</sup></h4></Col>
					<Col xs={0} md={3}></Col>
				</Row>
			</div>
		);
	});
}

function formatTime (time) {
	var timeFormat = 'hh:mm A';
	if (language === 'ja' || language === 'ko') {
		timeFormat = 'A hh:mm';
	}
	return moment(time, 'YYYY-MM-DDTHH:mm:ss').format(timeFormat);
}

function findLocation (locations, target_id) {
	return locations.find(function (loc) {
		return loc.id === target_id;
	}).name;
}

export default App;
