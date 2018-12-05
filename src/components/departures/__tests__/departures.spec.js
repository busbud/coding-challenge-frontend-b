import React from 'react';
import { Departures } from '../Departures';
import renderer from 'react-test-renderer';
jest.mock('../../departuresDetails/DeparturesDetails', () => 'DeparturesDetails');

const props = {
    departures: [{
        origin_location_id: 221,
        destination_location_id: 223
    }],
    locations: {
        '221': {
            name: "gare1"
        },
        '223': { name: "gare2" }
    }
}

describe('Departures', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<Departures {...props} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})
