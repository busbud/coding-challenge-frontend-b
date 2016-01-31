import React from 'react';

var SearchBar = React.createClass({
    render() {
        return (
            <div className="search-bar">
                <h3>New York</h3>
                <h3>Montreal</h3>
                <p>Date: 05-02-2016</p>
                <p>One-way ticket</p>
            </div>
        )
    }
});

export default SearchBar;