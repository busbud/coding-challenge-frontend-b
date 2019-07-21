
import React from "react";
import { useDataProvider } from '../contexts/SearchContext';

export const Search = () => {

    const dataProv = useDataProvider();
    // fetchData();
    const onSubmit = (e) => {
        e.preventDefault();
        dataProv.fetchData();
        return false
    }
    return <div>
        Search
        <form method="GET" action="" onSubmit={onSubmit}>
            <input type="text" name="from" />
            <input type="text" name="to" />
            <input type="text" name="date" />
            <button type="submit">
                Search
            </button>
        </form>
    </div>
}
export default Search
