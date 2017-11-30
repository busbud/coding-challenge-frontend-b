import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from '../../../css/List';

import Language from '../../../utils/Languages';


const DepartureInfoDesktop = props => {
    return (
                <div className="col-12">

                    <div className="row">
                        <div className="col-12">
                            <b>{props.operator}</b>
                        </div>
                    </div>

                    <br/>

                    <div className="row">
                        <div className="col-4">
                            <List>
                                <li><b>{Language('origin')}</b></li>
                                <li>{props.originLocationName}</li>
                                <li>{props.departureTime}</li> 
                            </List>
                        </div>
                        <div className="col-1 text-center">
                            <b>{Language('to')}</b>
                        </div>
                        <div className="col-4">
                            <List>
                                <li><b>{Language('destination')}</b></li>
                                <li>{props.destinationLocationName}</li>
                                <li>{props.arrivalTime}</li> 
                            </List>
                        </div>
                        <div className="col-3 text-right">
                            <p>{props.currency}&nbsp;{props.price}</p>
                        </div>
                    </div>
                    

                </div>
    );
}


DepartureInfoDesktop.propTypes = {
    operator: PropTypes.string.isRequired,
    originLocationName: PropTypes.string.isRequired,
    departureTime: PropTypes.string.isRequired,
    destinationLocationName: PropTypes.string.isRequired,
    arrivalTime: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
};

export default DepartureInfoDesktop