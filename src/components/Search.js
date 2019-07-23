
import React from "react";
import { useTranslation } from 'react-i18next';

import { useDataProvider } from '../contexts/SearchContext';
import './Search.css';
import { AutocompleteInput } from "./AutocompleteInput";
import { DatePicker } from "./DatePicker";
export const Search = () => {
    const dataProv = useDataProvider();
    const { t } = useTranslation();

    const onSubmit = (e) => {
        e.preventDefault();
        dataProv.fetchData();
        return false
    }

    return <div className="container">
        <form method="GET" action="" onSubmit={onSubmit} data-testid="search-form" >

            <div className="Search grid-wrapper ">
                <div className="col-3 col-sm-12">
                    <AutocompleteInput name="from" placeholder={t("Leaving from")} />
                </div>
                <div className="col-3 col-sm-12">
                    <AutocompleteInput name="to" placeholder={t("Going to")} />
                </div>
                <div className="col-3 col-sm-12">
                    <DatePicker />
                </div>
                <div className="col-3 col-sm-12">
                    <button type="submit" className="Search__button">
                        {t("Search")}
                    </button>
                </div>
            </div>
        </form>
    </div>
}
export default Search
