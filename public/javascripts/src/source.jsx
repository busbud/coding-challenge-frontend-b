import React from 'react';
import ReactDOM from 'react-dom';

function SearchBar(props){
  return (
    <div className='search-bar'>
        <form className="form-inline">
            <div className="form-group">
                <label htmlFor="origin">Origin</label>
                <input type="text" className="form-control" id="origin" placeholder="New York"/>
            </div>
            <div className="form-group">
                <label htmlFor="destination">Destination</label>
                <h4 className="form-control" id="destination"/> OSHEAGA
            </div>
            <button className="btn btn-warning" onClick={()=>{props.onClick()}}>Find my trip !</button>
        </form>
    </div>
  )
}

function ResultItem(props){
    return (
        <div className='media'>
            <div className='media-right  media-middle'>
                <h4> {props.location_dep.name} </h4>
                <h4> {props.location_arr.name} </h4>
            </div>
            <div className="media-body">
                <h4 className="media-heading">{props.departure.departure_time + ' - ' + props.departure.arrival_time}</h4>
                <p> Blabla </p>
            </div>
            <div className='media-right  media-middle'>
                <img className='media-object' src={props.operator.logo_url}/>
            </div>
        </div>
    );
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
                if (typeof this.state.operators == 'undefined'){
                    this.callApi('');
                }
            }
        })
        .catch((error) => {
            console.error(error);
        });

    };

    startResearch() {
        if (typeof this.state.operators == 'undefined'){
            this.setState({
                value:'clicked',
                message:'En attente des résultats'
            });
            this.callApi('');
        }
    };

    setMessage() {
        if (this.state.value == ('clicked')) {
            return <p> {this.state.message} </p>;
        } else if (this.state.value == ('found')) {
            console.log('On est dans le found avec value : ' + this.state.value + ' et operators : ' + this.state.operators);
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