import React from "react";
import {
    FormattedDate,
    FormattedTime,
    FormattedNumber
} from 'react-intl';

import { ReactComponent as HalfArrowRight} from '../assets/svg/icons/half-arrow-right.svg';

var classNames = require('classnames');

const ResultBox = props => {
    return (
        <div
            className={
                classNames(
                    'roadToOsheaga-coachella--results-box',
                    {
                        'roadToOsheaga-coachella--results-box-cheapest': props.cheapestItem === props.item.prices.total,
                        'roadToOsheaga-coachella--results-box-new-departure': props.newDeparture
                    }
                )
            }
        >
            <div className="roadToOsheaga-coachella--results-box--left-container roadToOsheaga-coachella--results-box--price">
                <p>
                    <FormattedNumber
                        value={ props.item.prices.total / 100 }
                        style="currency"
                        currency={ props.item.prices.currency }
                    />
                </p>
            </div>
            <div className="roadToOsheaga-coachella--results-box--right-container">
                <div className="roadToOsheaga-coachella--results-box--right-container--timetable">
                    <p>
                        <FormattedTime value={ props.item.departure_time } />
                        <span><FormattedDate value={ props.item.departure_time } /></span>
                        <span>
                            {
                                props.locations.find(
                                    (location) => (location.id === props.item.origin_location_id)
                                ).name
                            }
                        </span>
                    </p>
                    <HalfArrowRight className="roadToOsheaga-coachella--results-box--right-container--icon" />
                    <p>
                        <FormattedTime value={ props.item.arrival_time } />
                        <span><FormattedDate value={ props.item.arrival_time } /></span>
                        <span>
                            {
                                props.locations.find(
                                    (location) => (location.id === props.item.destination_location_id)
                                ).name
                            }
                        </span>
                    </p>
                </div>
                <div className="roadToOsheaga-coachella--results-box--right-container--details-container">
                    <p
                        className="roadToOsheaga-coachella--results-box--right-container--details roadToOsheaga-coachella--results-box--details--class"
                    >
                        { props.item.class }
                    </p> | <p
                        className="roadToOsheaga-coachella--results-box--right-container--details roadToOsheaga-coachella--results-box--details--operator"
                    >
                        { props.operator.name }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResultBox;