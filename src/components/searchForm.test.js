import React from 'react'
import ReactDOM from 'react-dom'
import SearchForm from './searchForm'

describe('SearchForm component', () => {
	let div

	beforeEach(() => {
		div = document.createElement('div')
	})

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(div)
	})

	it('renders correctly', () => {
		// TODO: mock these with jest.fn() add test if calls work
		const onChangeMock = () => {}
		const onSubmitMock = () => {}

		ReactDOM.render(<SearchForm
			from="DepartureCity"
			to="ArrivalCity"
			date={new Date(2018, 7, 2)}
			onChange={onChangeMock}
			onSubmit={onSubmitMock}
		/>, div)

		expect(div.innerHTML).toBe(
			'<form>' +
				'<label>From<input type="text" value="DepartureCity" name="fromInput"></label>' +
				'<label>To<input type="text" value="ArrivalCity" name="toInput"></label>' +
				'<label>When<input type="date" value="2018-08-02" name="dateInput"></label>' +
				'<input type="submit" value="search">' +
			'</form>'
		)
	})
})
