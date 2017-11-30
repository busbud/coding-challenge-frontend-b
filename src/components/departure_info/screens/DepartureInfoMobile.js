import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Language from '../../../utils/Languages';

import List from '../../../css/List';


const DepartureInfoMobile = props => {
    return (
                <div className="col-12">

                    <div className="row">
                        <div className="col-6 text-left">
                            <b>{props.operator}</b>
                        </div>
                        <div className="col-6 text-right">
                            <b>{props.currency}&nbsp;{props.price}</b>
                        </div>
                    </div>

                    <br/>

                    <div className="row">
                        <div className="col-12 text-center">
                            <List>
                                <li><b>{Language('origin')}</b></li>
                                <li>{props.originLocationName}</li>
                                <li><b>{Language('at')}</b></li>
                                <li>{props.departureTime}</li> 
                            </List>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-12  text-center">
                            <hr/>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-12  text-center">
                            <List>
                                <li><b>{Language('destination')}</b></li>
                                <li>{props.destinationLocationName}</li>
                                <li><b>{Language('at')}</b></li>
                                <li>{props.arrivalTime}</li> 
                            </List>
                        </div>
                    </div>
                    
                </div>
    );
}


DepartureInfoMobile.propTypes = {
    operator: PropTypes.string.isRequired,
    originLocationName: PropTypes.string.isRequired,
    departureTime: PropTypes.string.isRequired,
    destinationLocationName: PropTypes.string.isRequired,
    arrivalTime: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
};

export default DepartureInfoMobile