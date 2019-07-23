import React from 'react'
import { StateContext } from '../contexts/SearchContext';
import { render } from '@testing-library/react'

import Results from './Results';

import departures from '../fixtures/departures.json';
import cities from '../fixtures/cities.json';
import locations from '../fixtures/locations.json';


describe("Results", () => {
    it("Should render departure cards", () => {
        const { getAllByTestId } = render(
            <StateContext.Provider value={{ departures, cities, locations }}>
                <Results />
            </StateContext.Provider>
        );
        expect(getAllByTestId('departure-card').length).toBe(7);
    })
})
