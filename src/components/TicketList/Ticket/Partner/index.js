import React from 'react';
import { string } from 'prop-types';

import { Action } from '../../../';
import './style.scss';

function Partner({ operatorLogo, operatorName, operatorUrl }) {
	return (
		<section className="partner">
			<Action onClick={operatorUrl} classnames="link" target="_blank" rel="noopener noreferrer">
				<header className="logo"><img src={operatorLogo} alt={operatorName} /></header>
				<p>{operatorName}</p>
			</Action>
		</section>
	);
}

Partner.propTypes = {
	operatorLogo: string,
	operatorName: string,
	operatorUrl: string,
};

export default Partner;
