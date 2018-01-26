import React from 'react'
import Enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SearchForm from './searchForm'

Enzyme.configure({adapter: new Adapter()})

describe('SearchForm component', () => {
	let onChangeMock
	let onSubmitMock
	let wrapper

	beforeEach(() => {
		onChangeMock = jest.fn()
		onSubmitMock = jest.fn()
		wrapper = mount(<SearchForm
			from="DepartureCity"
			to="ArrivalCity"
			date={new Date(2018, 7, 2)}
			onChange={onChangeMock}
			onSubmit={onSubmitMock}
		/>)
	})

	it('renders the correct html', () => {
		expect(wrapper.html()).toBe(
			'<form>' +
				'<label>From<input type="text" value="DepartureCity" name="fromInput"></label>' +
				'<label>To<input type="text" value="ArrivalCity" name="toInput"></label>' +
				'<label>When<input type="date" value="2018-08-02" name="dateInput"></label>' +
				'<label>Currency<select name="currencyInput">' +
					'<option value="CAD">CAD</option>' +
					'<option value="USD">USD</option>' +
					'<option value="EUR">EUR</option>' +
				'</select></label><input type="submit" value="search">' +
			'</form>'
		)
	})

	it('submit correctly', () => {
		wrapper.find('input[type="submit"]').simulate('click')
		expect(onSubmitMock).toBeCalled()
	})

	it('handle change', () => {
		wrapper.find('input[name="fromInput"]').simulate('change', {target: {value: 'Malibu'}})
		expect(onChangeMock).lastCalledWith('from', 'Malibu')

		wrapper.find('input[name="toInput"]').simulate('change', {target: {value: 'Paris'}})
		expect(onChangeMock).lastCalledWith('to', 'Paris')

		wrapper.find('input[type="date"]').simulate('change', {target: {value: '2018-09-20'}})
		expect(onChangeMock).lastCalledWith('date', new Date('2018-09-20'))
	})
})
