import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import moment from 'moment/min/moment-with-locales'
import queryString from 'query-string';
import { list, pollList } from '../../services/trip';
import Result from './';
import './ResultList.scss';
import { Menu, Dropdown, Button, Spin, Icon, Skeleton } from 'antd';


class ResultList extends Component {

	tripSettings = {
		origin: {
			label: 'New York',
			geoHash: 'dr5reg'
		},
		destination: {
			label: 'Montréal',
			geoHash: 'f25dvk'
		},
		date: '2019-08-02',
		params: {
			children: 0,
			adult: 1,
			senior: 0,
			lang: 'en_US',
			currency: 'USD'
		}
	};

	state = {
		progress: 0,
		cities: [],
		departures: [],
		locations: [],
		operators: []
	};

	// First fetch
	initialFetch = async () => {
		const results = await list(this.tripSettings.origin.geoHash, this.tripSettings.destination.geoHash, this.tripSettings.date, queryString.stringify(this.tripSettings.params));

		this.setState({
			progress: results.complete ? 100 : 60,
			cities: results.cities,
			departures: results.departures,
			locations: results.locations,
			operators: results.operators
		});

		this.props.onProgressChange(this.state.progress);
		console.log(this.state);
	};

	// Poll interval called if necessary
	pollFetch = async () => {
		const interval = setInterval(async () => {
			const results = await pollList(this.tripSettings.origin.geoHash, this.tripSettings.destination.geoHash, this.tripSettings.date, queryString.stringify(this.tripSettings.params));

			if (results.complete) {
				clearInterval(interval);
			}

			this.setState({
				progress: results.complete ? 100 : (this.state.progress + ((100 - this.state.progress) * 10) / 100),
				departures: results.departures,
				locations: results.locations,
				operators: results.operators
			});

			this.props.onProgressChange(this.state.progress);
		}, 2000);
	};

	getLocation = (locationId) => {
		return this.state.locations.filter(location => location.id === locationId)[0];
	};

	getOperator = (companyId) => {
		return this.state.operators.filter(operator => operator.id === companyId)[0];
	};

	displayLoader = () => {
		const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
		const isComplete = this.state.progress === 100;
		if (!isComplete) {
			return (
					<Spin indicator={antIcon} />
			);
		}
	};

	sortDeparturesBy = (method) => {
		const sortedDepartures = this.state.departures.sort((a, b) => {
			if (method === 'price') {
				return a.prices.total - b.prices.total;
			} else if (method === 'schedule') {
				return moment(a.departure_time).format('X') - moment(b.departure_time).format('X');
			}
		});
		this.setState({
			departures: sortedDepartures
		});
	};

	handleSortingMenuClick = (e) => {
		this.sortDeparturesBy(e.item.props.value);
	};

	renderSkeleton = () => {
		if (!this.state.progress) {
			return (
					<div className="row w-100">
						<Skeleton active className="col-12 col-lg-6 mb-4"/>
						<Skeleton active className="col-12 col-lg-6 mb-4"/>
						<Skeleton active className="col-12 col-lg-6 mb-4"/>
						<Skeleton active className="col-12 col-lg-6 mb-4"/>
					</div>
			)
		}
	};

	/**
	 * Fetch result from Busbud API
	 */
	async componentDidMount() {
		// First fetch
		await this.initialFetch();
		// Poll interval
		if (this.state.progress !== 100) {
			await this.pollFetch();
		}

		this.sortDeparturesBy('schedule');
	}

	render() {

		const { t, i18n } = this.props;

		const menu = (
				<Menu onClick={this.handleSortingMenuClick}>
					<Menu.Item key="1"
										 value="price"
										 className="d-flex align-items-center">
						<Icon type="dollar" />{t('sort.price')}
						</Menu.Item>
					<Menu.Item key="2"
										 value="schedule"
										 className="d-flex align-items-center">
						<Icon type="clock-circle" />{t('sort.schedule')}
						</Menu.Item>
				</Menu>
		);

		return(
			<div className="row Results">
				<div className="col-12 text-center">
					{ this.displayLoader() }
					<h2 className="d-inline-block text-center mb-4">
						{ this.state.departures.length }
						{ t('searching_01') }
						<span className="d-inline-flex align-items-center2">
								<span className="originLabel">
									New York
								</span>
								<Icon type="arrow-right" theme="outlined" className="mx-2"/>
								<span className="destinationLabel">
									Montréal
								</span>
							</span>
						{ t('searching_02') }
						<span className="departureDate">
								<strong>
									{ moment(this.tripSettings.date).locale(i18n.languages[0]).format('LL') }
								</strong>
							</span>
					</h2>
					<div className="row mb-4">
						<div className="col-12 d-flex justify-content-end">
							<Dropdown overlay={menu}>
								<Button className="d-flex align-items-center">
									{ t('sort.title') } <Icon type="down" />
								</Button>
							</Dropdown>
						</div>
					</div>
				</div>
				{ this.renderSkeleton() }
				{this.state.departures.map(departure => (
					<div key={departure.id}
							 className="col-12 col-lg-6 mb-4 fadeIn">
						<Result departure={departure}
										originLocation={this.getLocation(departure.origin_location_id)}
										destinationLocation={this.getLocation(departure.destination_location_id)}
										operator={this.getOperator(departure.operator_id)}
						/>
					</div>
				))}
			</div>
		)
	}

	static propTypes = {
		onProgressChange: PropTypes.func,
		departure: PropTypes.shape({
			origin_location_id: PropTypes.string,
			destination_location_id: PropTypes.string,
			operator_id: PropTypes.string
		})
	};
}

export default translate('common')(ResultList);