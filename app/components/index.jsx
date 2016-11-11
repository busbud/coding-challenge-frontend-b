import React from 'react';
import SearchBar from './searchBar.jsx';

export default class IndexPage extends React.Component {
    render() {
        return (
            <div>
                <SearchBar placeHolder1="Leaving from" placeHolder2="Going to"/>
            </div>
        );
    }
}
