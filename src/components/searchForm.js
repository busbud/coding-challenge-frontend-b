import React from 'react'
import {formatDate} from '../utils/formatters'

const SearchForm = ({from, to, date, onChange, onSubmit}) => (
	<form>
		<label>
			From
			<input type="text" value={from} name="fromInput" onChange={e => onChange('from', e.target.value)} disabled/>
		</label>
		<label>
			To
			<input type="text" value={to} name="toInput" onChange={e => onChange('to', e.target.value)} disabled/>
		</label>
		<label>
			When
			<input type="date" value={formatDate(date)} name="dateInput" onChange={e => onChange('date', new Date(e.target.value))}/>
		</label>
		<label>
			Currency
			<select name="currencyInput" onChange={e => onChange('currency', e.target.value)}>
				{['CAD', 'USD', 'EUR'].map(code => (<option value={code} key={code}>{code}</option>))}
			</select>
		</label>
		<input type="submit" onClick={onSubmit} value="search"/>
	</form>
)

export default SearchForm
