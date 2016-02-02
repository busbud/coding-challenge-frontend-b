import React from 'react';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import TicketList from './TicketList';


let Departures = React.createClass({
    render() {
        return (
            <div className="row departures">
                <div className="columns">
                    <SearchBar {...this.props}/>
                    <div className="departures_result">
                        <div className="row">
                            <FilterBar {...this.props}/>
                            <TicketList {...this.props}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default Departures;