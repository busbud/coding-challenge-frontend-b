
import React from "react";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { useDataProvider } from '../contexts/SearchContext';
import './Search.css';
import { AutocompleteInput } from "./AutocompleteInput";
export const Search = () => {
    const dataProv = useDataProvider();

    const onSubmit = (e) => {
        e.preventDefault();
        dataProv.fetchData();
        return false
    }

    return <div className="container">
        <form method="GET" action="" onSubmit={onSubmit} data-testid="search-form" >

            <div className="Search grid-wrapper ">
                <div className="col-3">
                    <AutocompleteInput name="from" placeholder="Leaving from" />
                </div>
                <div className="col-3">
                    <AutocompleteInput name="to" placeholder="Going to" />
                </div>
                <div className="col-3">
                    <DayPickerInput name="date" onDayChange={

                        day => dataProv.dispatch({
                            type: "SET_SEARCH_PARAM",
                            name: "date",
                            value: day.toISOString().slice(0, 10)
                        })
                    } className="Search__input" placeholder="Departure date" format="YYYY-MM-DD" />
                </div>
                <div className="col-3">
                    <button type="submit" className="Search__button">
                        Search
                    </button>
                </div>
            </div>
        </form>
    </div>
}
export default Search
