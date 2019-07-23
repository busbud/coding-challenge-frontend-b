import React from 'react'
import { StateContext } from '../contexts/SearchContext';
import { render, fireEvent, act } from '@testing-library/react'

import AutocompleteInput from './AutocompleteInput';

const { fetchSuggestions } = require('../utils/suggestions');
const dispatch = jest.fn();

jest.mock('../utils/suggestions', () => {
    return { fetchSuggestions: jest.fn(() => ([])) }
})
jest.useFakeTimers()

describe("AutoCompleteInput", () => {
    it("Should call fetchSuggestions function ", () => {
        act(() => {
            const { getByTestId } = render(
                <StateContext.Provider value={{
                    dispatch,
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
                    <AutocompleteInput name="from" />
                </StateContext.Provider>
            );

            fireEvent.keyUp(getByTestId('auto-input'));
            jest.runAllTimers();
            expect(fetchSuggestions).toHaveBeenCalled();
        })

    })
})
