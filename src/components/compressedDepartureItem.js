import React, { Component } from 'react';

import Moment from 'react-moment';

import { Amenities } from './amenities';
import { Terms } from './terms';

import classnames from 'classnames';
import { Translation } from '../languages/lang';

export class CompressedDepartureItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: ''
        };
        this.onClick = this.onClick.bind(this);
    }
    onClick(ev, index) {
        this.setState({
            active: index
        });
    }
    render() {
        const departure = this.props.departure;
        const about = departure.about;
        const locations = Object.keys(departure.location);
        return (
            <div className="compressed-card">
                <h2>{this.props.operator}</h2>
                {locations.length &&
                    locations.map((loc, i) => (
                        <div key={i} className="row">
                            <div className="col-12 destination">
                                {loc.replace('|', ' - ')}
                            </div>
                            {about.length &&
                                about.map(
                                    (t, colIndex) =>
                                        loc.indexOf(t.origin) > -1 &&
                                        loc.indexOf(t.destination) > -1 && (
                                            <div
                                                key={colIndex}
                                                className="cb">
                                                <div className="card compressed-box border-dark">
                                                    <div className="card-header border-dark">
                                                        <div className="text-dark">
                                                            <Moment
                                                                format={
                                                                    this.props.isEng
                                                                        ? 'hh:mm a'
                                                                        : 'HH:mm'
                                                                }>
                                                                {t.departureTime}
                                                            </Moment>
                                                            &ndash;
                                                            <Moment
                                                                format={
                                                                    this.props.isEng
                                                                        ? 'hh:mm a'
                                                                        : 'HH:mm'
                                                                }>
                                                                {t.arrivalTime}
                                                            </Moment>
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="col-12 price-area">
                                                            <div className="text-center mb-1">{Translation.trips.replace(/{trips}/, t.price.length)}</div>
                                                            {t.price &&
                                                                t.price.map(
                                                                    (
                                                                        info,
                                                                        index
                                                                    ) => (
                                                                        <div key={index} 
                                                                            className={classnames({
                                                                                price: true,
                                                                                active: this.state.active === colIndex
                                                                            })}
                                                                            >
                                                                            <span
                                                                                onClick={
                                                                                    event => this.onClick(event, colIndex)
                                                                                }
                                                                                className={classnames({
                                                                                    btn: true,
                                                                                    "btn-outline-primary": true,
                                                                                    active: this.state.active === colIndex
                                                                                })}>
                                                                                ${info.price}{' '}    
                                                                                <span className="currency">
                                                                                    {info.currency}
                                                                                </span>
                                                                            </span>
                                                                            <div className="details">
                                                                                <Amenities
                                                                                    departure={info}
                                                                                />
                                                                                <Terms departure={info} />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                )}
                        </div>
                    ))}
            </div>
        );
    }
}
