import React from 'react';
import DepartureDetails from '../DepartureDetails';
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
    departure_city: 'new york',
    arrival_city: 'montréal',
    originLocation: {
        name: 'new york'
    },
    destinationLocation: {
        name: 'Montréal'
    }
}

describe('DepartureDetails', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<DepartureDetails {...props} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})
