import React, { Component } from 'react';
import Result from './Result.js';

class ResultsTable extends Component {
    render() {
        let citiesList = this.props.cities || [];
        let departuresList = this.props.departures || [];
        let operatorsList = this.props.operators || [];
        let locations = this.props.locations;
        let isFetching = this.props.fetching;

        const isEmpty = departuresList.length === 0;

        return (
            <div className="results">
                {isFetching &&
                    <p className="results--fetching">Fetching data...</p>
                }

                {!isEmpty &&
                    <Result
                        cities={ citiesList }
                        departures={ departuresList }
                        locations={ locations }
                        operators={ operatorsList }
                    />
                }
            </div>
        );
    }
}

export default ResultsTable;