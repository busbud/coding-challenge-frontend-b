import React, { Component } from 'react';
import { CompressedDepartureItem } from './compressedDepartureItem';

import { Translation } from '../languages/translation';

export class CompressedDeparture extends Component {
    render() {
        const departureItems = Object.keys(this.props.departures).map(
            (d, index) => (
                <CompressedDepartureItem
                    isEng={Translation.getLanguage()}
                    operator={d}
                    departure={this.props.departures[d]}
                    key={index}
                />
            )
        );
        console.log('compressed ', this.props.departures);
        return (
            <div>
                {!Object.keys(this.props.departures).length ? (
                    <div className="alert alert-primary">
                        {Translation.noDepartures}
                    </div>
                ) : (
                    departureItems
                )}
            </div>
        );
    }
}
