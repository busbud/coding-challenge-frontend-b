import React from 'react';
import renderer from 'react-test-renderer';

import { Navigation } from './';

const noOp = () => '';

describe('Component', () => {
	it('should render', () => {
		const wrapper = renderer.create(<Navigation t={noOp} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
