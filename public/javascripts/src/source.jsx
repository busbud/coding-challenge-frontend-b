import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'moment';
import {Loader} from 'react-loaders'



class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    };

    render (){
        return (
            <div className='search-bar'>
                <form className="form-inline">
                    <div className='row'>
                        <div className="form-group search__item col-md-4 col-xs-12">
                            <label htmlFor="origin">Origin</label>
                            <select name="origin" id="origin" className="form-control search__field center-block" >
                                <option value="new-york">New-York</option>
                            </select>
                        </div>
                        <div className="form-group search__item col-md-4 col-xs-12">
                            <label htmlFor="destination">Destination</label>
                            <input type='text' className="form-control  center-block search__field" id="destination" placeholder="OSHEAGA !" disabled/>
                        </div>
                        <div id='search__button' className="form-group  center-block search__item col-md-4 col-xs-12">
                            <button className="btn btn-warning search__field" onClick={()=>{this.props.onClick()}}>Find my trip !</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

class ResultItem extends React.Component {
    constructor(props) {
        super(props);
    };

    checkWifi() {
        if (this.props.departure.amenities.wifi){
            return <i className="fa fa-wifi info__item" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Wifi available !"> </i>;
        }
    }

    checkToilet() {
        if (this.props.departure.amenities.toilet){
            return <i className="fa fa-bath info__item" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Toilets available !"> </i>;
        }
    }

    checkAC() {
        if (this.props.departure.amenities.ac){
            return <i className="fa fa-thermometer-empty info__item" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="AC available !"> </i>;
        }
    }

    checkFood() {
        if (this.props.departure.amenities.food){
            return <i className="fa fa-shopping-basket info__item" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Food available !"> </i>;
        }
    }

    checkTV() {
        if (this.props.departure.amenities.tv){
            return <i className="fa fa-television info__item" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="TV available !"> </i>;
        }
    }

    render() {
        return (
            <div className='media'>
                <div className='media-left  media-middle'>
                    <div>
                        <p className='text-center'> {this.props.location_dep.name} </p>
                    </div>
                    <div>
                        <i className="fa fa-arrow-down fa-2x text-center" aria-hidden="true"></i>
                    </div>
                    <div>
                        <p className='text-center'> {this.props.location_arr.name} </p>
                    </div>
                </div>
                <div className="media-body">
                    <h4 className='info__group'>
                        <p id='price' className="info__item pull-right">{' ' + (this.props.departure.prices.total/100) + ' $CAD'}</p>
                    </h4>
                    <h3 className='info__group center-block text-center'>
                        <p id='hours' className="info__item">{' ' + Moment(this.props.departure.departure_time).format('hh:mmA') + ' - ' + Moment(this.props.departure.arrival_time).format('hh:mmA')}</p>
                    </h3>
                    <h5 className='info__icons center-block text-center'>
                        <i className="fa fa-clock-o info__item" aria-hidden="true"> </i>
                        {this.checkWifi()}
                        {this.checkToilet()}
                        {this.checkAC()}
                        {this.checkFood()}
                        {this.checkTV()}
                    </h5>
                </div>
                <div className='media-right  media-middle'>
                    <img className='media-object center-block' src={this.props.operator.logo_url}/>
                </div>
            </div>
        );
    }
}

class ResultsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <ul className='media-list'> 
                {this.props.departures.map(function(depart){
                    let dep_op = this.props.operators.find(function(op){
                        return op.id == depart.operator_id;
                    });
                    let dep_loc = this.props.locations.find(function(loc){
                        return loc.id == depart.origin_location_id;
                    });
                    let arr_loc = this.props.locations.find(function(loc){
                        return loc.id == depart.destination_location_id;
                    });
                    return <ResultItem departure={depart} operator={dep_op} location_dep={dep_loc} location_arr={arr_loc}/>;
                }, this)}
            </ul>
        );
    }
}


class Finder extends React.Component {
    
    constructor() {
        super();
        this.i = 0;
        this.state = {
            value: 'init',
            message: ''
        }
    };

    callApi(index){
        let poll = '';
        if(index == ''){
            console.log('First callApi : ');
            this.i = 0;
        } else {
            poll = '/poll';
            console.log('Multimple callApi : ' + index);
        }
        const url = 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-03-01'+poll+'?adult=1&child=0&senior=0&lang=CA&currency=CAD'+index;
        console.info('called url : ' + url);
        fetch(url, {
            headers: {
                'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                'x-busbud-token' : 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(JSON.stringify(responseJson));
            const response = responseJson;
            const new_operators = this.state.operators ? this.state.operators.concat(response.operators) : response.operators;
            const new_locations = this.state.locations ? this.state.locations.concat(response.locations) : response.locations;
            const new_departures = this.state.departures ? this.state.departures.concat(response.departures) : response.departures;
            this.setState({
                value:'found',
                message:'Résultats trouvées',
                operators: new_operators,
                locations: new_locations,
                departures: new_departures
            });
            if(!response.complete){
                this.i++;
                console.info('this.i incremented : ' + this.i);
                this.callApi('&index='+ this.i);
            } else {
                console.info('Complete : ' + response.complete);
                //If complete but no result, launch again
                if (typeof this.state.operators == 'undefined' || this.state.operators.length < 1){
                    console.log('Launch again the callApi');
                    this.callApi('');
                } else {
                    console.log('We don\'t launch again since this.state.operators : ' + this.state.operators);

                }
            }
        })
        .catch((error) => {
            console.error(error);
        });

    };

    startResearch() {
        if (typeof this.state.operators == 'undefined'){
            console.log('this.state.operators is not defined');
            this.setState({
                value:'clicked',
                message:'En attente des résultats'
            });
            this.callApi('');
        } else if ( this.state.operators.length < 1){
            console.log('this.state.operators is defined but empty');
            this.callApi('');
        } else {
            console.log('this.state.operators is defined : ' + this.state.operators);
        }
    };

    renderLoader() {
        return <Loader type="line-scale" active="true" />
    }
    setMessage() {
        if (this.state.value == ('clicked' )) {
            //return <Loader type="pacman" />;
            return <p> En attente des résultats </p>
        } else if (this.state.value == ('found')) {
            console.log('On est dans le found avec value : ' + this.state.value + ' et operators : ' + this.state.operators);
            //return <Loader type="line-scale" active="true" />;
            return <ResultsList operators={this.state.operators} departures={this.state.departures} locations={this.state.locations}/>;
        }
    }

    render() {
        return (
            <div className="finder">
                <SearchBar onClick={()=>this.startResearch()}/>
                <div className="results-list" id='resultsList'>
                    {this.setMessage()}
                </div>
            </div>
        );
    }
}


//------------------------------------------------
ReactDOM.render(
    <Finder />,
    document.getElementById('container')
);