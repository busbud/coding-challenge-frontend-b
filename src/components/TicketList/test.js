import React from 'react';
import renderer from 'react-test-renderer';

import { TicketList } from './';
import { defaultState } from '../../reducers/';

const noOp = () => '';

describe('Component', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<TicketList t={noOp} tickets={defaultState.tickets} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
