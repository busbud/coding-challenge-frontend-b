import React, { Component } from 'react';
import Result from './Result.js';

class ResultsTable extends Component {
    render() {
        let citiesList = this.props.cities || [];
        let departuresList = this.props.departures || [];
        let operatorsList = this.props.operators || [];
        let locations = this.props.locations;
        let isFetching = this.props.isFetching;

        const isEmpty = departuresList.length === 0;

        return (
            <div>
                {isFetching &&
                    <p>Fetching data...</p>
                }

                {!isEmpty &&
                    <table>
                        
                            <thead>
                                <tr>
                                    <th>Origin</th>
                                    <th>Destination</th>
                                    <th>Departure Date</th>
                                    <th>Departure Time</th>
                                    <th>Arrival Date</th>
                                    <th>Arrival Time</th>
                                    <th>Class</th>
                                    <th>Seats Available</th>
                                    <th>Operator</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                        
                            <tbody>
                                <Result
                                    cities={ citiesList }
                                    departures={ departuresList }
                                    locations={ locations }
                                    operators={ operatorsList }
                                />
                            </tbody>
                    </table>
                }
            </div>
        );
    }
}

export default ResultsTable;