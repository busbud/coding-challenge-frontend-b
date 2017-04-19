import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'moment';
import * as locales from 'moment/min/locales';



class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wifi: false,
            ac: false,
            toilet: false,
            tv: false
        }
    };

    click(type) {
        this.setState({
            wifi: this.props.wifiFilter,
            ac: this.props.acFilter,
            toilet: this.props.toiletFilter,
            tv: this.props.tvFilter
        });
    }

    render (){
        return (
            <div className='search-bar'>
                <div className="form-inline">
                    <div className='row'>
                        <div className="form-group search__item col-md-4 col-xs-12">
                            <label htmlFor="origin">{this.props.words[0]}</label>
                            <select name="origin" id="origin" className="form-control search__field center-block" >
                                <option value="new-york">New-York</option>
                            </select>
                        </div>
                        <div className="form-group search__item col-md-4 col-xs-12">
                            <label htmlFor="destination">{this.props.words[1]}</label>
                            <input type='text' className="form-control  center-block search__field" id="destination" placeholder="OSHEAGA !" disabled/>
                        </div>
                        <div id='search__button' className="form-group  center-block search__item col-md-4 col-xs-12">
                            <button className="btn btn-warning search__field" onClick={()=>{this.props.onClick()}}>{this.props.words[2]}</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="form-group search__item col-xs-6 col-sm-2">
                            <div className="btn-group filter__group pull-right">
                                <label>{this.props.words[3] + ' :' }</label>
                            </div>
                        </div>
                        <div className="form-group search__item col-xs-6 col-sm-3">
                            <div className="btn-group filter__group">
                                <div className={"btn btn-default filter__button " + (this.props.english ? "active" : "")} onClick={()=>{this.props.onEnglish()}}>
                                    <p className="">EN</p>
                                </div>
                                <div className={"btn btn-default filter__button " + (this.props.french ? "active" : "")} onClick={()=>{this.props.onFrench()}}>
                                    <p className="">FR</p>
                                </div>
                            </div>
                        </div>
                        <div className="form-group search__item col-xs-6 col-sm-3">
                            <div className="btn-group filter__group pull-right">
                                <label>{this.props.words[4] + ' :' }</label>
                            </div>
                        </div>
                        <div className="form-group search__item col-xs-6 col-sm-4">
                            <div className="btn-group filter__group">
                                <div className={"btn btn-default filter__button " + (this.props.wifiFilter ? "active" : "")} onClick={()=>{this.props.onWifiFilter();}}>
                                    <i className="fa fa-wifi"></i>
                                </div>
                                <div className={"btn btn-default filter__button " + (this.props.toiletFilter ? "active" : "")} onClick={()=>{this.props.onToiletFilter();}}>
                                    <i className="fa fa-bath"></i>
                                </div>
                                <div className={"btn btn-default filter__button " + (this.props.acFilter ? "active" : "")} onClick={()=>{this.props.onACFilter();}}>
                                    <i className="fa fa-thermometer-empty"></i>
                                </div>
                                <div className={"btn btn-default filter__button " + (this.props.tvFilter ? "active" : "")} onClick={()=>{this.props.onTVFilter();}}>
                                    <i className="fa fa-television"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class ResultItem extends React.Component {
    constructor(props) {
        super(props);
    };

    hideOnFilter() {
        const filters = ['wifi', 'toilet', 'ac', 'tv'];
        let hide = false;
        filters.map(function(filter){
            console.info('Filter, in map with filter = ' + filter);
            if(this.props[filter+'Filter']){
                console.log('A filter is active : ' + filter);
                if(!this.props.departure.amenities[filter]){
                    console.log('The filter hide a departure');
                    hide = true;
                }
            }
        }, this);
        return (hide ? 'media hidden' : 'media');
    }

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

    getDateFormat(){
        if (this.props.lang == 'en-ca'){
            return 'dddd, MMMM Do YYYY';
        } else {
            return 'dddd Do MMMM YYYY';
        }
    }

    getHourFormat(){
        if (this.props.lang == 'en-ca'){
            return 'hh:mmA';
        } else {
            return 'HH:mm';
        }
    }

    render() {
        return (
            <div className={this.hideOnFilter()}>
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
                    <div className='info__group'>
                        <h3 className='center-block text-center'>
                            <p id='hours' className="info__item">{' ' + Moment(this.props.departure.departure_time).format(this.getHourFormat()) + ' - ' + Moment(this.props.departure.arrival_time).format(this.getHourFormat())}</p>
                        </h3>
                        <p className='center-block text-center'> {Moment('2017-03-01').locale(this.props.lang).format(this.getDateFormat())} </p>
                    </div>
                    <h5 className='info__icons center-block text-center'>
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
                    return <ResultItem departure={depart} operator={dep_op} location_dep={dep_loc} location_arr={arr_loc} lang={this.props.lang} wifiFilter={this.props.wifiFilter} acFilter={this.props.acFilter} toiletFilter={this.props.toiletFilter} tvFilter={this.props.tvFilter}/>;
                }, this)}
            </ul>
        );
    }
}


class Finder extends React.Component {
    
    constructor() {
        super();
        this.i = 0;
        this.words_en = ['Departure', 'Destination', 'Find my trip !', 'Language', 'Amenities']
        this.words_fr = ['Départ', 'Arrivée', 'Allez !', 'Langue', 'Préférences']
        this.state = {
            active: false,
            wifiFilter: false,
            english: true,
            french: false,
            lang: 'en-ca',
            acFilter: false,
            tvFilter: false,
            toiletFilter: false,
            message: '',
            operators: [],
            locations: [],
            departures: [],
            words: this.words_en
        }
    };

    startResearch() {
        if ( this.state.departures.length < 1){
            console.log('this.state.departures is defined but empty');
            this.setState({
                active: true,
                message:'En attente des résultats'
            });
            this.callApi('', this.state.lang);
        } else {
            console.log('this.state.departures is defined : ' + this.state.departures);
        }
    };

    callApi(index, lang){
        let poll = '';
        if(index == ''){
            console.log('First callApi : ');
            this.i = 0;
        } else {
            poll = '/poll';
            console.log('Multiple callApi : ' + index);
        }
        const url = 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-03-01'+poll+'?adult=1&child=0&senior=0&lang='+ lang +'&currency=CAD'+index;
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
                message:'Résultats trouvées',
                operators: new_operators,
                locations: new_locations,
                departures: new_departures
            });
            if(!response.complete){
                this.i++;
                console.info('this.i incremented : ' + this.i);
                this.callApi('&index='+ this.i, this.state.lang);
            } else {
                console.info('Complete : ' + response.complete);
                //If complete but no result, launch again
                if (this.state.departures.length < 1){
                    console.log('Launch again the callApi');
                    this.callApi('', this.state.lang);
                } else {
                    console.log('We don\'t launch again since this.state.departures.length : ' + this.state.departures.length);
                    this.setState({
                        active: false
                    });
                }
            }
        })
        .catch((error) => {
            console.error(error);
        });

    };

    renderLoader() {
        if (this.state.active){
            return (
                <div className="loader-container">
                    <h4 className='text-center'> En attente de résultats...</h4>
                </div>
            )
        }
    }

    setMessage() {
        return (
            <div>
                <div className='loader__container'>
                    {this.renderLoader()}
                </div>
                <ResultsList operators={this.state.operators} departures={this.state.departures} lang={this.state.lang} english={this.state.english} french={this.state.french} locations={this.state.locations} wifiFilter={this.state.wifiFilter} acFilter={this.state.acFilter} toiletFilter={this.state.toiletFilter} tvFilter={this.state.tvFilter}/>;
            </div>
        )
    }

    wifiFiltering() {
        const boo = this.state.wifiFilter ? false : true;
        this.setState({
            wifiFilter: boo
        })
    }

    acFiltering() {
        const boo = this.state.acFilter ? false : true;
        this.setState({
            acFilter: boo
        })
    }

    tvFiltering() {
        const boo = this.state.tvFilter ? false : true;
        this.setState({
            tvFilter: boo
        })
    }

    toiletFiltering() {
        const boo = this.state.toiletFilter ? false : true;
        this.setState({
            toiletFilter: boo
        })
    }

    onEnglish() {
        if(this.state.french){
            this.setState({
                english: true,
                french: false,
                lang: 'en-ca',
                words: this.words_en
            });
        }
    }

    onFrench() {
        if(this.state.english){
            this.setState({
                english: false,
                french: true,
                lang: 'FR',
                words: this.words_fr
            });
        }
    }

    render() {
        return (
            <div className="finder">
                <SearchBar onClick={()=>this.startResearch()} onEnglish={()=>this.onEnglish()} onFrench={()=>this.onFrench()} onWifiFilter={()=>this.wifiFiltering()} onACFilter={()=>this.acFiltering()} onTVFilter={()=>this.tvFiltering()} onToiletFilter={()=>this.toiletFiltering()} words={this.state.words} wifiFilter={this.state.wifiFilter} toiletFilter={this.state.toiletFilter} acFilter={this.state.acFilter} tvFilter={this.state.tvFilter} english={this.state.english} french={this.state.french}/>
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