import React from 'react';
import SearchBar from './searchBar.jsx';
import {departureAPI} from "./departureAPI.js";
import 'whatwg-fetch'

export default class IndexPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            origin: {
                value: "New York",
                geoHash: "dr5reg"
            },
            destination: {
                value: "Montreal",
                geoHash: "f25dvk"
            },
            date: new Date("August 4 2017"),
            departures: ''
        };
    }

    search() {
        departureAPI.fetchDeparture(this.state.origin.geoHash, this.state.destination.geoHash, this.state.date).then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({departures: json});
            console.log(this.state.departures);
        })

    }

    render() {
        return (
            <div>
                <img src="osheaga.png" alt="Osheaga" className="img-responsive center-block"></img>
                <div>
                    <SearchBar value1={this.state.destination.value} value2={this.state.origin.value} placeHolder1="Leaving from" placeHolder2="Going to" onSubmit={() => this.search()}/>
                </div>
            </div>
        );
    }
}
