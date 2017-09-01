import React from 'react';
import { func, string, bool } from 'prop-types';
import { translate } from 'react-i18next';

import { Action } from '../';

import './style.scss';

export function Settings({ t, onLanguageChange, onCurrencyChange, currency, complete }) {
	const onClick = () => onCurrencyChange(currency);
	return (
		<section className="app-settings">
			<span>
				{t('common:linkCurrencyChange')}: <Action
					disabled={!complete}
					onClick={onClick}
					classnames="link"
				>
					{currency}
				</Action>
			</span>
			<span>
				Change Language: <Action onClick={onLanguageChange} classnames="link">
					{t('common:linkLanguageChange')}
				</Action>
			</span>
		</section>
	);
}

Settings.propTypes = {
	t: func,
	onLanguageChange: func,
	onCurrencyChange: func,
	currency: string,
	complete: bool,
};

export default translate()(Settings);
