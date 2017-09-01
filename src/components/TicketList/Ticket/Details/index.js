import React from 'react';
import { string, number, object, func } from 'prop-types';

import { Action } from '../../../';
import getGmapsUrl from '../../../../actions/getGmapsUrl';
import './style.scss';

function Details({ t, origin, destination, duration, transfers, review }) {
	const transferStr = (
		<strong>{
			transfers
			? `${transfers} ${t('ticketDetailStops')}`
			: t('ticketDetailNonStop')
		}</strong>
	);

	const durationStr = (<strong>
		{parseInt(duration / 60, 10)} {t('hours')} {duration % 60} {t('minutes')}
	</strong>);
	const spacedArrow = ' → ';
	return (
		<section className="details">
			<p>
				<Action classnames="link" onClick={getGmapsUrl(origin.name)}>{origin.name}</Action>
				{spacedArrow}
				<Action classnames="link" onClick={getGmapsUrl(destination.name)}>
					{destination.name}
				</Action>
			</p>
			<p>{transferStr} {t('ticketTravelWillTake')} {durationStr}</p>
			<p>{t('ticketReviews')}: {t(review)}</p>
		</section>
	);
}

Details.propTypes = {
	duration: number,
	transfers: number,
	review: string,
	origin: object,
	destination: object,
	t: func,
};

export default Details;
