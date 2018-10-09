import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Translation } from '../languages/lang';
import { DepartureItem } from './departureItem';
import { Filters } from './filters';

const localStorage = window.localStorage;

export class Departure extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dropdownOpen: false,
			sortBy: Translation.lowestPrice,
			sort: localStorage.getItem('sort') || 1
		};
		this.toggle = this.toggle.bind(this);
		this.sortDepartures = this.sortDepartures.bind(this);
	}
	componentWillMount() {
		const sort = parseInt(localStorage.getItem('sort') || 1);
		this.setDepartures(sort);
	}
	componentWillReceiveProps(props) {
		this.setState({
			sortBy: props.filters.find(f => f.id === this.state.sort).name
		});
	}
	toggle(e) {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	}
	sortDepartures(e, sortBy) {
		e.preventDefault();
		this.toggle();

		localStorage.setItem('sort', sortBy);
		this.setDepartures(sortBy);
	}
	setDepartures(sort) {
		this.setState({
			sortBy: this.props.filters.find(f => f.id === sort).name,
			sort: sort,
			departures: this.props.setDeparture(this.props.departures, sort)
		});
	}
	render() {
		return (
			<div className="row">
				{this.props.fetchError ? (
					<div className="col-10 offset-1 alert alert-danger">
						{Translation.fetchErrorMessage}
					</div>
				) : (
					<div className="row">
						<Filters
							filters={this.props.filters}
							dropdownOpen={this.state.dropdownOpen}
							sortBy={this.state.sortBy}
							toggle={this.toggle}
							sortDepartures={this.sortDepartures}
						 />
						<div className="col-12">
							<h2 className="route-name">
								{this.props.departures.length}{' '}
								{Translation.route} {Translation.routeFrom}{' '}
								{this.props.originCityName}{' '}
								{Translation.routeTo}{' '}
								{this.props.destinationCityName}{' '}
								{Translation.routeOn}{' '}
								{this.props.dateFormat}{' '}
								<FontAwesomeIcon icon="calendar-alt" />
							</h2>
						</div>
						<div className="col-12">
							{!this.props.departures.length ? (
								<div className="alert alert-primary">
									{Translation.noDepartures}
								</div>
							) : (
								this.props.departures.map(
									(departure, index) => (
										<DepartureItem
											key={index}
											departure={departure}
											isEng={
												Translation.getLanguage() ===
												'en'
											}
										/>
									)
								)
							)}
						</div>
					</div>
				)}
			</div>
		);
	}
}
