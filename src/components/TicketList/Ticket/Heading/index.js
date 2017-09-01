import React from 'react';
import { string, number, func } from 'prop-types';

import './style.scss';
import { Layout, Header } from '../../../';

function getHoursMins(date) {
	return date.toLocaleString('en-us', {
		hour: '2-digit',
		minute: '2-digit',
	});
}

function getDaysDiff(date, duration) {
	return parseInt(((date.getHours() * 60) + date.getMinutes() + duration) / (24 * 60), 10);
}

function Heading({ t, departure, arrival, duration }) {
	const departureDate = new Date(departure);
	const arrivalDate = new Date(arrival);

	const departs = (
		<section>
			{t('common:ticketDeparture')}: <strong>{getHoursMins(departureDate)}</strong>
		</section>
	);

	const daysDiff = getDaysDiff(departureDate, duration);
	const daysDiffString = daysDiff ? `(+${daysDiff})` : '';
	const arrives = (
		<section>
			{t('common:ticketArrival')}: <strong>{getHoursMins(arrivalDate)} {daysDiffString}</strong>
		</section>
	);

	const durationString = `
		${parseInt(duration / 60, 10)} ${t('hours')} ${duration % 60} ${t('minutes')}
	`;
	const tripTime = (
		<section>
			{t('common:ticketTripTime')}: <strong>{durationString}</strong>
		</section>
	);

	return (
		<Header classnames="heading">
			<Layout columns={[departs, arrives, tripTime]} />
		</Header>
	);
}

Heading.propTypes = {
	departure: string,
	arrival: string,
	duration: number,
	t: func,
};

export default Heading;
