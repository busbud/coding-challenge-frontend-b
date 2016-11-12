import React from 'react';
import SearchBar from './searchBar.jsx';
import 'whatwg-fetch'

export default class IndexPage extends React.Component {
    render() {
        return (
            <div>
                <img src="osheaga.png" alt="Osheaga" className="img-responsive center-block"></img>
                <div>
                    <SearchBar value1={this.state.destination.value} value2={this.state.origin.value} placeHolder1="Leaving from" placeHolder2="Going to" onSubmit={() => this.fetchDeparture()}/>
                </div>
            </div>
        );
    }
}
