import React from 'react';
import { node, arrayOf } from 'prop-types';
import OneColumn from '../OneColumn';

import './style.scss';

function NColumns({ columns }) {
	return (
		<div className="columns">
			{columns.map((c, i) => <OneColumn key={i} columns={[c]} />)}
		</div>
	);
}

NColumns.propTypes = {
	columns: arrayOf(node).isRequired,
};

export default NColumns;
