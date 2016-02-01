import React from 'react';

var SearchBar = React.createClass({
    render() {
        return (
            <div className="search-bar row">
                <div className="columns">
                    <p className="search-bar_text">Select your trip from</p>
                    <h2 className="search-bar_cities">New York to Montreal</h2>
                    <p className="search-bar_date">February, 5 2016</p>
                    <p>One-way ticket</p>
                </div>
                <div className="columns">
                    <div className="columns small-12 medium-5 header_igloo-logo"><img src="http://igloofest.ca/public/app/uploads/images/5661d13eecfee.png" alt="igloofest logo"/></div>
                </div>
            </div>
        )
    }
});

export default SearchBar;