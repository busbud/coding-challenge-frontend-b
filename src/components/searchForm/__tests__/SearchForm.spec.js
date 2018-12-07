import React from 'react';
import { searchForm as SearchForm } from '../SearchForm';
import renderer from 'react-test-renderer';

jest.mock('@material-ui/core/TextField', () => 'TextField');
jest.mock('@material-ui/core/Paper', () => 'Button');

jest.mock('moment', () => () => ({format: () => '2019-08-02'}));

const props = {
    cleanStore: () => { },
    searchRequestSuccess: () => { },
    i18n: { _: jest.fn().mockReturnValue('translation mock') }
};
describe('SearchForm', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<SearchForm {...props} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})



