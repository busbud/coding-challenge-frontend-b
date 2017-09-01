import React from 'react';
import renderer from 'react-test-renderer';

import Component from './';

describe('Component', () => {
	it('should render button', () => {
		const wrapper = renderer.create(<Component />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render link', () => {
		const wrapper = renderer.create(<Component classnames="link" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
