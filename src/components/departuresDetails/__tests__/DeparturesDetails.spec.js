import React from 'react';
import DeparturesDetails from '../DeparturesDetails';
import renderer from 'react-test-renderer';

jest.mock('@material-ui/core/Paper', () => 'Paper');
jest.mock('@material-ui/core/Paper', () => 'Button');

const props = {
    departure: {
        departure_time: '2019-08-02T09:55:45',
        arrival_time: '2019-08-02T19:55:00',
        prices: {
            total: 25
        }
    },
    originLocation: {
        name: 'new york'
    },
    destinationLocation: {
        name: 'Montréal'
    }
}

describe('DeparturesDetails', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<DeparturesDetails {...props} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})
