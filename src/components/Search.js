import React, { Component } from 'react';
import Results from './Results.js';
import { BeatLoader } from 'react-spinners';

var index = 0;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: 'New York',
            destination: 'Montreal',
            date:'2018-08-02',
            adults: 1,
            departures: [],
            complete: false,
            loading: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({loading: true});
        fetch('https://napi.busbud.com/x-departures/dr5reg/f25dvk/'+this.state.date+'/poll?adult='+this.state.adults+'&index='+index, {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                'X-Busbud-Token': 'GUEST_E4I5SatyR7mNG_eZwz5ikw',
            })
        })
        .then(response => response.json())
        .then(json => {
            // i don't think i'm doing the polling thing right
            const departure = json.departures.map((d) => {
                return ({
                    id: d.id,
                    departure_time: d.departure_time,
                    arrival_time: d.arrival_time,
                    origin: json.locations.find(location => location.id === d.origin_location_id).name,
                    destination: json.locations.find(location => location.id === d.destination_location_id).name,
                    price: d.prices.total/100 + " USD"
                })
            })
            // pretty sure i'm not
            index = index + departure.length;
            this.setState({departures:[...this.state.departures, ...departure]})
            if(!json.complete) {
                this.handleSubmit(event);
            }  else {
                // yay u r done
                this.setState({complete: json.complete, loading: false});
            }
        })
    }

    render() {
        return (
            <div>
                <div className="search">
                    <form className="form" onSubmit={this.handleSubmit}>
                        <div className="flex-container">
                            <div className="box">
                                <i className="fas fa-location-arrow"></i>
                                <input type="text" id="origin" value={this.state.origin} disabled />
                            </div>
                            <div className="box">
                                <i className="fas fa-map-marker"></i>
                                <input type="text" id="destination" value={this.state.destination} disabled />
                            </div>
                            <div className="box">
                            <i className="fas fa-calendar"></i>
                                <input type="text" id="date" value={this.state.date} disabled />
                            </div>
                            <div className="box">
                                <i className="fas fa-user"></i>
                                <input type="text" id="adults" value={this.state.adults} disabled />
                            </div>
                        </div>
                        <p><input type="submit" value="Search" /></p>
                    </form>
                </div>
                <div className="loader" style={{display: this.state.loading ? 'block' : 'none'}}>
                    <BeatLoader color={'#066491'} margin={'5px'} loading={this.state.loading} />
                </div>
                <div style={{display: this.state.loading ? 'none' : 'block'}}>
                <Results departures={this.state.departures} />
                </div>
            </div>
        )
    }
}

export default Search;
