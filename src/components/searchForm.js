import React from 'react'

const SearchForm = ({from, to, date, onChange, onSubmit}) => (
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
			<input type="date" value={new Date(date).toLocaleDateString('en-CA')} name="dateInput" onChange={e => onChange('date', new Date(e.target.value))}/>
		</label>
		<input type="submit" onClick={onSubmit} value="search"/>
	</form>
)

export default SearchForm
