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
            <button className="btn btn-default" onClick={()=>{props.onClick()}}>Find my trip !</button>
        </form>
    </div>
  )
}

function ResultsItem(props){
    return (
        <p> Result </p>
    );
}

class ResultsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <ul> 
                {this.props.departures.map(function(depart){
                    console.info('depart : ' + JSON.stringify(depart));
                    return <li key={depart.prices.total.toString()}> {depart.prices.total.toString() + '  (' + depart.departure_timezone.toString() + ')'} </li>;
                })}
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

        fetch('https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-03-01'+poll+'?adult=1&child=0&senior=0&lang=CA&currency=CAD'+index, {
            headers: {
                'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                'x-busbud-token' : 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(JSON.stringify(responseJson));
            const response = responseJson;
            this.setState({
                value:'found',
                message:'Résultats trouvées',
                operators: response.operators,
                departures: response.departures
            });
            if(!response.complete){
                console.info('Not complete : ' + response.complete);
                console.info('this.i : ' + this.i);
                this.i++;
                console.info('this.i incremented : ' + this.i);
                this.callApi('&index='+ this.i);
            } else {
                console.info('Complete : ' + response.complete);
            }
        })
        .catch((error) => {
            console.error(error);
        });

    };

    startResearch() {
        this.setState({
            value:'clicked',
            message:'En attente des résultats'
        });
        this.callApi('');
    };

    setMessage() {
        if (this.state.value == ('clicked')) {
            console.log('On est dans le if avec value : ' + this.state.value + ' et message : ' + this.state.message);
            return <p> {this.state.message} </p>;
        } else if (this.state.value == ('found')) {
            console.log('On est dans le found avec value : ' + this.state.value + ' et operators : ' + this.state.operators);
            return <ResultsList operators={this.state.operators} departures={this.state.departures}/>;
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