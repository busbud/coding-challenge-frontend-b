import React from 'react'

const SearchForm = ({from, to, date, onChange}) => (
	<form>
		<label>
			From
			<input type="text" value={from} name="fromInput" onChange={e => onChange('from', e.target.value)}/>
		</label>
		<label>
			To
			<input type="text" value={to} name="toInput" onChange={e => onChange('to', e.target.value)}/>
		</label>
		<label>
			When
			<input type="text" value={date} name="dateInput" onChange={e => onChange('date', e.target.value)}/>
		</label>
	</form>
)

export default SearchForm
