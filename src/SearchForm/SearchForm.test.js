import React from 'react';
import { shallow } from 'enzyme';
import SearchForm from './SearchForm';
import ReadOnlyInput from './ReadOnlyInput/ReadOnlyInput';
import SubmitButton from './SubmitButton/SubmitButton';
import { Form } from 'semantic-ui-react';

it('renders 3 read-only inputs', () => {
  const searchForm = shallow(<SearchForm />);

  expect(searchForm.find(ReadOnlyInput).length).toBe(3);
});

it('renders 1 submit button', () => {
  const searchForm = shallow(<SearchForm />);

  expect(searchForm.find(SubmitButton).length).toBe(1);
});

it('triggers the callback on form submit', () => {
  const submitCallback = jest.fn(() => {});
  const searchForm = shallow(<SearchForm onSubmit={submitCallback} />);

  searchForm.find(Form).simulate('submit');

  expect(submitCallback).toBeCalled();
});
