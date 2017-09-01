import React from 'react';
import { arrayOf, object, func } from 'prop-types';
import { translate } from 'react-i18next';

import './style.scss';

import Ticket from './Ticket';

export function TicketList({ t, tickets }) {
	const list = tickets.map((ticket, i) => (
		<Ticket index={i + 1} key={ticket.id} ticket={{ ...ticket, t }} />
	));
	return (
		<section className="ticket-list">
			{list.length ? list : <p className="error">{t('noTicketsError')}</p>}
		</section>
	);
}

TicketList.propTypes = {
	tickets: arrayOf(object).isRequired,
	t: func,
};

export default translate()(TicketList);
