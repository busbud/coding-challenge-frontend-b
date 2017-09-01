import React from 'react';
import { object, number } from 'prop-types';

import { Layout } from '../../';
import Heading from './Heading';
import CallToAction from './CallToAction';
import Partner from './Partner';
import Details from './Details';

import './style.scss';

function Ticket({ ticket, index }) {
	const callToAction = <CallToAction {...ticket} index={index} />;
	const partner = <Partner {...ticket} />;
	const details = <Details {...ticket} />;

	return (
		<article className="ticket">
			<Heading {...ticket} index={index} />
			<Layout columns={[partner, details, callToAction]} />
		</article>
	);
}

Ticket.propTypes = {
	ticket: object,
	index: number,
};

export default Ticket;
