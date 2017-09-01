import React from 'react';
import { string, number, func } from 'prop-types';

import './style.scss';
import { Action } from '../../../';

function CallToAction({ t, price, currency, url }) {
	return (
		<section className="buy">
			<p>
				{(price / 100).toLocaleString('en-US', {
					style: 'currency',
					currency,
				})}
			</p>
			<Action onClick={url}>{t('ticketViewDeal')}</Action>
		</section>
	);
}

CallToAction.propTypes = {
	price: number,
	currency: string,
	url: string,
	t: func,
};

export default CallToAction;
