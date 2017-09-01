import React from 'react';
import { node, arrayOf } from 'prop-types';

import './style.scss';

function OneColumn({ columns }) {
	return (
		<div className="column">
			{columns[0]}
		</div>
	);
}

OneColumn.propTypes = {
	columns: arrayOf(node).isRequired,
};

export default OneColumn;
