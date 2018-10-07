import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import { Translation } from '../languages/lang';
import { DepartureItem } from './departureItem';

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
						<div className="filter">
							<ButtonDropdown
								isOpen={this.state.dropdownOpen}
								toggle={this.toggle}
							>
								<DropdownToggle caret>
									{Translation.sortBy} {this.state.sortBy}
								</DropdownToggle>
								<DropdownMenu>
									{this.props.filters.map(s => (
										//eslint-disable-next-line
										<a
											href="#"
											key={s.id}
											onClick={event =>
												this.sortDepartures(event, s.id)
											}
											className="dropdown-item"
										>
											{s.name}
										</a>
									))}
								</DropdownMenu>
							</ButtonDropdown>
						</div>
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
