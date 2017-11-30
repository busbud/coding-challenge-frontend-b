import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Result from '../../css/Result';

import {Desktop, Tablet, Mobile} from '../../utils/Responsive';

import DepartureInfoMobile from './screens/DepartureInfoMobile';
import DepartureInfoDesktop from './screens/DepartureInfoDesktop';

const DepartureInfo = props => {
    return (<Result className="row">

        <Mobile>
            <DepartureInfoMobile
                    operator={props.operator}
                    originLocationName={props.originLocationName}
                    departureTime={props.departureTime}
                    destinationLocationName={props.destinationLocationName}
                    arrivalTime={props.arrivalTime}
                    price={props.price}
                    currency={props.currency}
            />
        </Mobile>

        <Desktop>

            <DepartureInfoDesktop
                operator={props.operator}
                originLocationName={props.originLocationName}
                departureTime={props.departureTime}
                destinationLocationName={props.destinationLocationName}
                arrivalTime={props.arrivalTime}
                price={props.price}
                currency={props.currency}
            />

        </Desktop>

        <Tablet>

            <DepartureInfoDesktop
                operator={props.operator}
                originLocationName={props.originLocationName}
                departureTime={props.departureTime}
                destinationLocationName={props.destinationLocationName}
                arrivalTime={props.arrivalTime}
                price={props.price}
                currency={props.currency}
            />

        </Tablet>
    
    </Result>);
}

DepartureInfo.propTypes = {
    operator: PropTypes.string.isRequired,
    originLocationName: PropTypes.string.isRequired,
    departureTime: PropTypes.string.isRequired,
    destinationLocationName: PropTypes.string.isRequired,
    arrivalTime: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
};

export default DepartureInfo