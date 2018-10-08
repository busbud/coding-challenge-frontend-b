import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import Layout from '../components/layout';
import { Departure } from '../components/departure';

import { Translation, DEFAULT_LANGUAGE } from '../languages/lang';
import { timeout, geohashToCity } from '../api/service';
import { apiFetch } from '../api/ajax';
import { getDestination } from '../api/helper';

import { FormSearch } from '../components/formSearch';

import '../api/libs';

const localStorage = window.localStorage;

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			origin: 'dr5reg',
			destination: 'f25dvk',
			date: '2019-08-02', //yyyy-mm-dd
			departures: [],
            filters: [],
			fetchError: false,
			loading: true,
			submitted: false
		};

		this.formSubmit = this.formSubmit.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
    }
    componentWillMount() {
        let language = localStorage.getItem('lang') || DEFAULT_LANGUAGE;
		this.setLanguage(language);
		this.fetch();
	}
	setLanguage(lang) {
        localStorage.setItem('lang', lang);
		Translation.setLanguage(lang);
		this.setState({
			filters: [
				{
					id: 1,
					name: Translation.lowestPrice
				},
				{
					id: 2,
					name: Translation.travelTime
				}
			]
		}); //To force a particular language
	}
	formSubmit(e) {
		e.preventDefault();
		this.fetch();
	}
	fetch() {
		this.setState({
			loading: true,
			submitted: true
		});
		const api = {
			origin: this.state.origin,
			destination: this.state.destination,
			date: this.state.date
		};
		apiFetch(api, false, {
			adult: 1
		})
			.then(obj => {
				let departures = getDestination(obj);
				console.log('inital fetch: ', departures);

				this.setState({
					departures: this.setDeparture(departures)
				});

				if (!obj.complete) {
					this.poll(
						obj.departures.length > 0 ? obj.departures.length : 10
					);
				}

				this.setState({
					loading: false,
					submitted: false
				});
			})
			.catch(err => {
				this.setState({
					loading: false,
                    submitted: false,
					fetchError: true
				});
			});
	}
	poll(initalResult) {
		const api = {
			origin: this.state.origin,
			destination: this.state.destination,
			date: this.state.date
		};
		apiFetch(api, true, {
			index: initalResult
		}).then(pollObj => {
			const newDepartures = getDestination(pollObj);
			console.log('poll: ', newDepartures);
			this.setState({
				departures: this.setDeparture([
					...this.state.departures,
					...newDepartures
				])
			});
			if (!pollObj.complete) {
				timeout(2500).then(() => this.poll(initalResult));
			}

			this.setState({
				loading: false,
				submitted: false
			});
		});
	}
	setDeparture(departures, sort = '') {
		const sorting = sort || this.state.sort;
		switch (sorting) {
			case 1:
				departures = departures.sort((a, b) => {
					let nowTime = new Date(a.departureTime);
					let nextTime = new Date(b.departureTime);
					return a.price - b.price || nowTime - nextTime;
				});
				break;
			case 2:
				departures = departures.sort((a, b) => {
					let nowTime = new Date(a.departureTime);
					let nextTime = new Date(b.departureTime);
					return (
						a.totalDuration - b.totalDuration ||
						a.price - b.price ||
						nowTime - nextTime
					);
				});
				break;
			default:
		}
		return departures;
	}
	render() {
		const originCityName = geohashToCity(this.state.origin);
        const destinationCityName = geohashToCity(this.state.destination);
        const dateFormat = (new Date(this.state.date)).format(Translation.getLanguage() === 'en' ? 'DDD, MMM D' : 'DDD, D MMM.');
		return (
			<Layout onChange={this.setLanguage}>
				<div id="wrap" className="container">
					<div className="row">
						<div className="col-lg-10 col-sm-12 offset-lg-1">
							<FormSearch
								origin={this.state.origin}
								destination={this.state.destination}
								date={this.state.date}
                                dateFormat={dateFormat}
                                submitted={this.state.submitted}
								formSubmit={this.formSubmit}
								originCityName={originCityName}
								destinationCityName={destinationCityName}
							/>
						</div>
					</div>
					<div className="tickets">
						{this.state.loading ? (
							<div className="loading">
								<img
									src="img/loader.svg"
									alt={Translation.loading}
								/>{' '}
								{Translation.loading}
							</div>
						) : (
							<Departure
								originCityName={originCityName}
								destinationCityName={destinationCityName}
								origin={this.state.origin}
								destination={this.state.destination}
								date={this.state.date}
                                dateFormat={dateFormat}
								filters={this.state.filters}
								departures={this.state.departures}
								setDeparture={this.setDeparture}
                                fetchError={this.state.fetchError}
							/>
						)}
					</div>
				</div>
			</Layout>
		);
	}
}

export default App;
