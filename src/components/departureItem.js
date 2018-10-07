import React, { Component } from 'react';

import { Translation } from '../languages/lang';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Moment from 'react-moment';

export class DepartureItem extends Component {
    render() {
        const width = 120,
            height = 120;
        const logo_url = this.props.departure.operator.logo_url
            .replace(/{width}/, width)
            .replace(/{height}/, height);
        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-col operator-logo">
                        <img src={logo_url} alt={this.props.departure.operator.display_name} />
                    </div>
                    <div className="card-col">
                        <div className="detail-label">
                            {Translation.placeholderOrigin}
                        </div>
                        <div
                            className="location"
                            title={this.props.departure.origin.name}>
                            {this.props.departure.origin.name}
                        </div>
                        <div className="time departureTime">
                            <Moment
                                format={this.props.isEng ? 'hh:mm a' : 'HH:mm'}>
                                {this.props.departure.departureTime}
                            </Moment>
                        </div>
                    </div>
                    <div className="card-col arrow-direction">
                        <FontAwesomeIcon icon="map-pin" className="direction" />
                        <FontAwesomeIcon
                            icon="long-arrow-alt-right"
                            className="direction mid"
                        />
                        <FontAwesomeIcon
                            icon="map-marker-alt"
                            className="direction"
                        />
                        <div className="duration">
                            <FontAwesomeIcon
                                icon="map-marker-alt"
                                className="direction"
                            />
                            {Translation.flightDuration}
                            {': '}
                            {this.props.departure.duration}
                        </div>
                    </div>
                    <div className="card-col">
                        <div className="detail-label">
                            {Translation.placeholderDestination}
                        </div>
                        <div
                            className="location"
                            title={this.props.departure.destination.name}>
                            {this.props.departure.destination.name}
                        </div>
                        <div className="time">
                            <Moment
                                format={this.props.isEng ? 'hh:mm a' : 'HH:mm'}>
                                {this.props.departure.arrivalTime}
                            </Moment>
                        </div>
                    </div>
                    <div className="card-col cost">
                        <div>
                            {Translation.currency} {this.props.departure.price}
                            <span className="currency">
                                {this.props.departure.currency}
                            </span>
                        </div>
                        <div className="detail-label">{Translation.busWay}</div>
                    </div>
                </div>
            </div>
        );
    }
}
