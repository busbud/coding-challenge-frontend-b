import React from 'react';
import {SearchForm} from '../SearchForm';
import renderer from 'react-test-renderer';

jest.mock('@material-ui/core/TextField', () => 'TextField');
jest.mock('@material-ui/core/Paper', () => 'Button');

const props = {
    cleanStore: () => {},
    searchRequestSuccess: () => {}
};
describe('SearchForm', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<SearchForm {...props} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})
