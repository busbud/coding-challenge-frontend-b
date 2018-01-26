import React from 'react'
import Enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ResultList from './resultList'

Enzyme.configure({adapter: new Adapter()})

describe('ResultList component', () => {
	it('renders an empty list', () => {
		const wrapper = mount(<ResultList departures={[]}/>)
		expect(wrapper.html()).toBe('<ul></ul>')
	})

	it('renders a non-empty list', () => {
		const wrapper = mount(<ResultList departures={[
			{/* eslint-disable camelcase */
				busbud_departure_id: 1,
				arrival_time: '2018-01-20T16:00:00',
				departure_time: '2018-01-20T15:00:00',
				destination_location: {name: 'B'},
				origin_location: {name: 'A'},
				prices: {currency: 'CAD', total: 2060}
			},
			{
				busbud_departure_id: 2,
				arrival_time: '2018-01-23T03:00:00',
				departure_time: '2018-01-20T15:00:00',
				destination_location: {name: 'D'},
				origin_location: {name: 'C'},
				prices: {currency: 'CAD', total: 3000}
			}/* eslint-enable camelcase */
		]}/>)

		expect(wrapper.html()).toBe(
			'<ul>' +
				'<li>' +
					'<div>departure: A at 15:00</div>' +
					'<div>arrival: B at 16:00</div>' +
					'<div>price: CAD 20.60</div>' +
				'</li>' +
				'<li>' +
					'<div>departure: C at 15:00</div>' +
					'<div>arrival: D at 03:00<span>(+3)</span></div>' +
					'<div>price: CAD 30</div>' +
				'</li>' +
			'</ul>')
	})
})
