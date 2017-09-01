import React from 'react';
import { node, any } from 'prop-types';
import css from 'classnames';

import './style.scss';

function Header({ children, classnames }) {
	return (<header className={css(classnames, 'header')}>{children}</header>);
}

Header.propTypes = {
	children: node,
	classnames: any,
};

export default Header;
