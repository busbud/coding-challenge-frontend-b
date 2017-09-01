import React from 'react';
import { node, any } from 'prop-types';
import css from 'classnames';

import './style.scss';

function Action({ children, onClick, classnames, ...rest }) {
	let onClickHandler = onClick;
	if (typeof onClick === 'string') {
		onClickHandler = () => window.open(onClick, '_blank');
	}

	if (classnames && (classnames === 'link' || classnames.indexOf('link') >= 0)) {
		return (
			<a
				className={css(classnames, { disabled: rest.disabled })}
				onClick={onClickHandler}
				{...rest}
			>
				{children}
			</a>
		);
	}

	return (
		<button
			className={css('button', { disabled: rest.disabled })}
			onClick={onClickHandler} {...rest}
		>
			{children}
		</button>
	);
}

Action.propTypes = {
	children: node,
	classnames: any,
	onClick: any,
};

export default Action;
