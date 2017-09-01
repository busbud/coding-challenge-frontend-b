import React from 'react';
import { node, arrayOf } from 'prop-types';

import types from './types';

function Layout({ columns }) {
	const ChosenLayout = columns.length > 1 ? types.NColumns : types.OneColumn;

	return <ChosenLayout columns={columns} />;
}

Layout.propTypes = {
	columns: arrayOf(node).isRequired,
};

export default Layout;
