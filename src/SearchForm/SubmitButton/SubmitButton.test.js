import React from 'react';
import { shallow } from 'enzyme';
import SubmitButton from './SubmitButton';

it('renders a submit button', () => {
  const submitButton = shallow(<SubmitButton />);

  expect(submitButton).toMatchSelector('[type="submit"]');
});

it('renders a submit button with label', () => {
  const submitButton = shallow(<SubmitButton label="Submit" />);

  expect(submitButton.dive()).toHaveText('Submit');
});
