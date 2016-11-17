import React from 'react';
import SearchBar from './searchBar.jsx';
import {fetchDeparture, pollDeparture} from "./clientDepartureAPI.js";
import Departure from './departure.jsx';
import update from 'immutability-helper';
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
            },
            query: {
                adult: 1,
                child: 0,
                senior: 0,
                lang: "en",
                currency: "CAD"
            },
            loading: false

        };
    }

    isSearching() {
      if (this.state.loading) {
        return (<div ><i className="fa fa-spinner fa-pulse fa-fw"></i> Loading...</div>)
      }
      else {
        return null;
      }
    }

    search() {
        this.setState({loading: true});
        fetchDeparture(this.state.origin.geoHash, this.state.destination.geoHash, this.state.date, this.state.query).then(response => {
            return response.json();
        }).then(json => {
            this.setState({departureJSON: json});
            this.setState({loading: !json.complete});
            if(!json.complete){
              this.poll();
            }
        })
    }

    poll() {
        pollDeparture(this.state.origin.geoHash, this.state.destination.geoHash, this.state.date, this.state.query, this.state.departureJSON.departures.length).then(response => {
            return response.json();
        }).then(json => {
            this.setState({loading: !json.complete});
            var newJSON = update(this.state.departureJSON,{
              departures: {$push: json.departures},
              operators: {$push: json.operators},
              complete: {$set: json.complete}
            });
            this.setState({departureJSON: newJSON});

            if (!json.complete) {
                this.poll();
            }
        });

    }

    render() {
        let loadingString ="";
        if (this.state.loading) {
          loadingString ="Loading...";
        } else {
          loadingString ="";
        }
        return (
            <div>
                <img src="osheaga.png" alt="Osheaga" className="img-responsive center-block"></img>
                <div>
                    <SearchBar value1={this.state.origin.value} value2={this.state.destination.value} placeHolder1="Leaving from" placeHolder2="Going to" onSubmit={() => this.search()}/>
                </div>
                <div className="text-center">{this.isSearching()}</div>
                <ul>
                    {this.state.departureJSON.departures.map(departure => {
                        return (
                            <li key={departure.busbud_departure_id}>
                                <Departure departure={departure} locations={this.state.departureJSON.locations} cities={this.state.departureJSON.cities}
                                  operators={this.state.departureJSON.operators} currency={this.state.query.currency}/>
                            </li>
                        )
                     })
                    }
                </ul>
            </div>

        );
    }
}
