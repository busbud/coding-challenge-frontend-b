import React from 'react';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm';
import DepartureResult from './DepartureResult';

class Search extends React.Component {
    static propTypes = {
        departures: PropTypes.array.isRequired,
        locations: PropTypes.array.isRequired,
        cities: PropTypes.array.isRequired,
        isSearching: PropTypes.bool.isRequired,
        search: PropTypes.func.isRequired,
        getCity: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.getCity('dr5reg'); // New York
        this.props.getCity('f25dvk'); // Montreal
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cities && nextProps.cities.length > 1) {
            nextProps.cities.sort(this.sortByName);
        }
    }

    sortByName(a, b) {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        else return 0;
    }

    handleSearch = (origin, destination, departureDate) => {
        this.props.search(origin, destination, departureDate);
    };

    render() {
        return (
            <React.Fragment>
                <div>
                    <h1>Search</h1>
                </div>
                <SearchForm cities={this.props.cities} isSearching={this.props.isSearching} onSubmit={this.handleSearch} />
                
                {this.props.isSearching && <div>Searching</div>}
                <div>
                    {this.props.departures && this.props.departures.map(result => (
                        <DepartureResult 
                            key={result.id} 
                            departure={result} 
                            locations={this.props.locations} />
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export default Search;
