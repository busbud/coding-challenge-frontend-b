import React, { Fragment } from 'react';
import SearchForm from './components/searchForm/SearchForm';
import Departures from './components/departures/Departures';

const App = () => {
    return (
        <Fragment>
            <SearchForm />
            <Departures />
        </Fragment >
    )
}
export default App;