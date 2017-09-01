import React from 'react';
import renderer from 'react-test-renderer';

import { Settings } from './';

const noOp = () => '';

describe('Component', () => {
	it('should render', () => {
		const wrapper = renderer.create(<Settings onCurrencyChange={noOp} t={noOp} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
