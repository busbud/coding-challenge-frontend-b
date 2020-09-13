import React, { Component } from "react";
import {
    FormattedMessage,
    FormattedDate,
    FormattedTime,
    FormattedNumber
} from 'react-intl';

var classNames = require('classnames');

const ResultBox = props => {
  return (
        <div
            className={
                classNames(
                    'roadToOsheaga-coachella--results-box',
                    {
                        'roadToOsheaga-coachella--results-box-cheapest': props.cheapestItem === props.item.prices.total
                    }
                )
            }
        >
            <div className="roadToOsheaga-coachella--results-box--header">
                <p><FormattedDate value={ props.item.departure_time } /></p>
                <p><FormattedTime value={ props.item.departure_time } /></p>
            </div>
            <div className="roadToOsheaga-coachella--results-box--from">
                <p>
                    <FormattedMessage id="coachella.city.from" defaultMessage="From:" />
                </p>
                <p>
                    { props.locations.find((location) => (location.id === props.item.origin_location_id)).name }
                </p>
            </div>
            <div className="roadToOsheaga-coachella--results-box--content">
                <p>
                    <FormattedNumber value={ props.item.prices.total / 100 } style="currency" currency={ props.item.prices.currency } />
                </p>
            </div>
            <div className="roadToOsheaga-coachella--results-box--to">
                <p>
                    <FormattedMessage id="coachella.city.to" defaultMessage="To:" />
                </p>
                <p>
                    { props.locations.find((location) => (location.id === props.item.destination_location_id)).name }
                </p>
            </div>
            <div className="roadToOsheaga-coachella--results-box--footer">
                <p><FormattedDate value={ props.item.arrival_time } /></p>
                <p><FormattedTime value={ props.item.arrival_time } /></p>
            </div>
        </div>
  );
};

export default ResultBox;