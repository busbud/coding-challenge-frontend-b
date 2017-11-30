import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../css/Header';
import HeaderElement from '../css/HeaderElement';
import Button from '../css/Button';
import ResultContainer from '../css/ResultContainer';

import DepartureInfo from './departure_info/DepartureInfo'

import Language from '../utils/Languages';

const DepartureSearch = props => {
    return (<div className="container">

        <Header className="row">
            <div className="col-12 text-center">


                <HeaderElement className="row">
                    <div className="col-12 text-center">
                        <img className="img-fluid" src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png" alt="festival logo"/>
                    </div>
                </HeaderElement>

                
                <HeaderElement className="row">
                    <div className="col-12 text-center">
                        <h5>
                            {Language('title')}
                        </h5>
                    </div>
                </HeaderElement>

            
            </div>            
        </Header>



        {props.loading ? (

            <div className="row">
                <div className="col-12 text-center">
                    
                    <div className="row">
                        <div className="col-12">
                            <img className="img-fluid" height="300" width="300" src="https://i2.wp.com/media.boingboing.net/wp-content/uploads/2015/10/tumblr_nlohpxGdBi1tlivlxo1_12801.gif?w=970"/>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-12">
                            <h5>{Language('loading')}</h5>
                        </div>
                    </div>
                    

                    
                </div>
            </div>

        ) : null}

        {!props.loading ? (

            <div className="row">
                <div className="col-12 text-center">
                    <Button onClick={props.onFetchDepartures}>{Language('btn')}</Button>
                </div>
            </div>

        ) : null}
        

        <ResultContainer className="row">
                <div className="col-12">
                    
                    {props.departures.map(function(item, index){
                        return (<DepartureInfo 
                            operator={item.operator}
                            originLocationName={item.originLocationName}
                            departureTime={item.departureTime}
                            destinationLocationName={item.destinationLocationName}
                            arrivalTime={item.arrivalTime}
                            price={item.price}
                            currency={item.currency}/>);
                    })}

                </div>
        </ResultContainer>

    </div>);
}

DepartureSearch.propTypes = {
    onFetchDepartures: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    departures: PropTypes.array.isRequired
};

export default DepartureSearch