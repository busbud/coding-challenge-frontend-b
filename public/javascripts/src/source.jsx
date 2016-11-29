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
                    return <li key={listValue.title.toString()}> {listValue.title.toString() + '  (' + listValue.releaseYear.toString() + ')'} </li>;
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
        return fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
                const movies = Array.from(responseJson.movies);
                this.movies = movies;
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
            console.log('On est dans le found avec value : ' + this.state.value + ' et movies : ' + this.movies);
            return <ResultsList list={this.movies} />;
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