import React from 'react'

const ResultList = ({departures}) => (
	<ul>
		{departures.map(({id}) => (
			<li key={id}>{id}</li>
		))}
	</ul>
)

export default ResultList
