import React from 'react'
import { StateContext } from '../contexts/SearchContext';
import { render, fireEvent } from '@testing-library/react'

import Search from './Search';
const fetchData = jest.fn();

describe("Search", () => {
    it("Should fetch data on submit", () => {
        const { getByTestId } = render(
            <StateContext.Provider value={{
                fetchData,
                searchParams: {
                    from: {
                        geohash: null,
                        name: "",
                    },
                    to: {
                        geohash: null,
                        name: "",
                    },
                    date: ""
                }
            }}>
                <Search />
            </StateContext.Provider>
        );

        fireEvent.submit(getByTestId('search-form'));

        expect(fetchData).toHaveBeenCalled();
    })
})
