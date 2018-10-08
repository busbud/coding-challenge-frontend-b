import React, { Component } from 'react';

import Moment from 'react-moment';

import { Amenities } from './amenities';
import { Terms } from './terms';

import classnames from 'classnames';

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
                                about
                                    .map(
                                        (t, index) =>
                                            loc.indexOf(t.origin) > -1 &&
                                            loc.indexOf(t.destination) > -1 && (
                                                <div
                                                    key={index}
                                                    className={classnames({
                                                        cb: true,
                                                        active:
                                                            this.state
                                                                .active ===
                                                            index
                                                    })}>
                                                    <button
                                                        onClick={event =>
                                                            this.onClick(
                                                                event,
                                                                index
                                                            )
                                                        }
                                                        className="btn btn-outline-primary">
                                                        <div className="price">
                                                            ${t.price}{' '}
                                                            <span className="currency">
                                                                {t.currency}
                                                            </span>
                                                        </div>
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
                                                        <div className="details">
                                                            <Amenities
                                                                departure={t}
                                                            />
                                                            <Terms
                                                                departure={t}
                                                            />
                                                        </div>
                                                    </button>
                                                </div>
                                            )
                                    )
                                    .sort((a, b) => {
                                        let nowTime = new Date(a.departureTime);
                                        let nextTime = new Date(
                                            b.departureTime
                                        );
                                        return (
                                            a.price - b.price ||
                                            nowTime - nextTime
                                        );
                                    })}
                        </div>
                    ))}
            </div>
        );
    }
}
