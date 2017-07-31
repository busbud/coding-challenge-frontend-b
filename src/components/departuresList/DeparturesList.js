import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment'
import { Departure } from '../departure/Departure';
import { translate } from 'react-i18next';

export class DeparturesList extends Component {
	constructor(props) {
		super(props);
		this.departures = [];
	}

	componentWillUpdate(nextProps) {
		if(_.get(nextProps, 'departures.departures')) {
			this.departures = nextProps.departures.departures.map(departure => {
				let location = _.find(nextProps.departures.locations, {id: departure.destination_location_id});
				return {
					departure: moment(departure.departure_time).format("YYYY/MM/DD - HH:mm"),
					arrival: moment(departure.arrival_time).format("YYYY/MM/DD - HH:mm"),
					location: location.name,
					price: '$' + departure.prices.total
				}
			});
		}
	}

	render() {
		const { t } = this.props;
		
		return (
			<table className="table table-striped">
				<thead>
					<tr>
						<th>{t('tableHeadDeparture')}</th>
						<th>{t('tableHeadArrival')}</th>
						<th>{t('tableHeadLocation')}</th>
						<th>{t('tableHeadPrice')}</th>
					</tr>
				</thead>
				<tbody>
					{ this.departures.map( (departure, i) => {
						return <Departure information={departure} key={i} />
					}) }
				</tbody>
			</table>
		);
	}
};
