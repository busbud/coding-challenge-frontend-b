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
                {this.props.list.map(function(listValue){
                    console.info('listValue : ' + JSON.stringify(listValue));
                    return <li key={listValue.name.toString()}> {listValue.name.toString() + '  (' + listValue.profile_id.toString() + ')'} </li>;
                })}
            </ul>
        );
    }
}


class Finder extends React.Component {
    
    constructor() {
        super();
        this.state = {
            value: 'init',
            message: ''
        }
    };

    getMoviesFromApiAsync() {
        this.setState({
            value:'clicked',
            message:'En attente des résultats'
        });
        return fetch('https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-08-04?adult=1&child=0&senior=0&lang=CA&currency=CAD', {
            headers: {
                'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                'x-busbud-token' : 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson));
                const operators = Array.from(responseJson.operators);
                this.operators = operators;
                this.setState({
                    value:'found',
                    message:'Résultats trouvées'
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    setMessage() {
        if (this.state.value == ('clicked')) {
            console.log('On est dans le if avec value : ' + this.state.value + ' et message : ' + this.state.message);
            return <p> {this.state.message} </p>;
        } else if (this.state.value == ('found')) {
            console.log('On est dans le found avec value : ' + this.state.value + ' et operators : ' + this.operators);
            return <ResultsList list={this.operators} />;
        }
    }

    render() {
        return (
            <div className="finder">
                <SearchBar onClick={()=>this.getMoviesFromApiAsync()}/>
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