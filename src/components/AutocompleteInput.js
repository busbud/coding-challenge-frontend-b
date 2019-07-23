import React, { useState } from 'react';
import { fetchSuggestions } from '../utils/suggestions'
import { useDataProvider } from '../contexts/SearchContext';
import './AutocompleteInput.css'

let timeout;
export const AutocompleteInput = ({ placeholder, name }) => {

    const { dispatch, searchParams } = useDataProvider();
    const [suggestions, setSuggestions] = useState([]);

    const onKeyUp = (e) => {
        const value = e.target.value
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
            const suggestionsData = await fetchSuggestions(value)
            setSuggestions(suggestionsData)
        }, 100);

        dispatch({
            type: "SET_SEARCH_PARAM",
            name,
            value: {
                "geohash": null,
                "name": value
            }
        })
    }
    const selectSuggestion = (item) => () => {
        setSuggestions([]);
        dispatch({
            type: "SET_SEARCH_PARAM",
            name,
            value: item
        })
    }
    return <div className="AutoInput">
        <input type="text" onChange={onKeyUp} value={searchParams[name].name || ""} name={name} autoComplete="off" className="Search__input" placeholder={placeholder} onKeyUp={onKeyUp} data-testid="auto-input" />
        {suggestions.length ?
            <ul className="AutoInput__dropdown">
                {suggestions.map(item => {
                    return <li key={item.geohash} className="AutoInput__dropdown-item">
                        <button type="button" onClick={selectSuggestion(item)} className="AutoInput__dropdown-button">
                            {item.name}
                        </button>
                    </li>
                })}
            </ul> : null}
    </div>
}

export default AutocompleteInput;
