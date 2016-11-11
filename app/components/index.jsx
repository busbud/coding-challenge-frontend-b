import React from 'react';
import SearchBar from './searchBar';

export default class IndexPage extends React.Component {
    render() {
        return (
            <div>
                <SearchBar placeHolder="Leaving from"/>
                <SearchBar placeHolder="Going to"/>
            </div>
        );
    }
}
