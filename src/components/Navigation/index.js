import React from 'react';
import { string, func } from 'prop-types';
import { translate } from 'react-i18next';

import './style.scss';

export function Navigation({ t, date, onDateChange }) {
	const datePicker = <input type="date" value={date} onChange={onDateChange} />;
	return (
		<nav className="navigation">
			<h1>
				{t('common:navigationHeader1')}
			</h1>
			<h2>
				{t('common:navigationHeader2')}
			</h2>
			<summary>
				{t('common:navigationSummary')}: {datePicker}
			</summary>
		</nav>
	);
}

Navigation.propTypes = {
	date: string,
	t: func,
	onDateChange: func,
};

export default translate()(Navigation);
