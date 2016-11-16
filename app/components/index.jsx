import React from 'react';
import SearchBar from './searchBar.jsx';
import {fetchDeparture} from "./departureAPI.js";
import Departure from './departure.jsx';
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
            departureJSON: {
              departures: []
            }
        };
    }

    search() {
        fetchDeparture(this.state.origin.geoHash, this.state.destination.geoHash, this.state.date).then(response => {
            return response.json();
        }).then(json => {
            this.setState({departureJSON: json});
        })

    }

    render() {
        return (
            <div>
                <img src="osheaga.png" alt="Osheaga" className="img-responsive center-block"></img>
                <div>
                    <SearchBar value1={this.state.origin.value} value2={this.state.destination.value} placeHolder1="Leaving from" placeHolder2="Going to" onSubmit={() => this.search()}/>
                </div>
                <ul>
                  {
                    this.state.departureJSON.departures.map(departure => {
                      return(
                    <li key={departure.busbud_departure_id} >
                      <Departure departure={departure} locations={this.state.departureJSON.locations} operators={this.state.departureJSON.operators} />
                    </li>)
                    })
                  }
                </ul>
              </div>

        );
    }
}
