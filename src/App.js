import React, { Fragment } from 'react';
import SearchForm from './components/searchForm/SearchForm';
import Departures from './components/departures/Departures';
import Header from './components/header/Header';

const App = () => {
    return (
        <Fragment>
            <Header />
            <SearchForm />
            <Departures />
        </Fragment >
    )
}
export default App;