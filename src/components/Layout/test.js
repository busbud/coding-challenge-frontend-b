import React from 'react';
import renderer from 'react-test-renderer';

import Component from './';

describe('Component', () => {
	it('should render', () => {
		const wrapper = renderer.create(<Component columns={['hey']} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
