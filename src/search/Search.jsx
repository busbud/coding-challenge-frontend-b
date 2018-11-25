import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import SearchForm from './SearchForm';
import DepartureResults from './DepartureResults';

class Search extends React.Component {
    static propTypes = {
        departures: PropTypes.array.isRequired,
        locations: PropTypes.array.isRequired,
        cities: PropTypes.array.isRequired,
        isSearching: PropTypes.bool.isRequired,
        isCompleteResults: PropTypes.bool.isRequired,
        clearSearchResults: PropTypes.func.isRequired,
        search: PropTypes.func.isRequired,
        getCity: PropTypes.func.isRequired,
    };

    state = {
        destinationCity: undefined,
        origin: undefined,
        destination: undefined,
        departureDate: undefined,
    };

    timer = null;

    componentWillMount() {
        this.props.getCity('dr5reg'); // New York
        this.props.getCity('f25dvk'); // Montreal
    }

    componentWillUnmount() {
        this.stopPolling();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cities && nextProps.cities.length > 1) {
            nextProps.cities.sort(this.sortByName);
        }
    }

    stopPolling = () => {
        clearInterval(this.timer);
        this.timer = null;
    };

    sortByName(a, b) {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        else return 0;
    }

    handleSearch = (origin, destination, departureDate) => {
        this.setState({
            destinationCity: this.props.cities.find(city => city.geohash === destination),
            origin,
            destination,
            departureDate,
        });

        this.props.clearSearchResults();
        this.props.search(origin, destination, departureDate);
        
        this.timer = setInterval(() => this.poll(), 3000);
    };

    poll = () => {
        if (this.props.isSearching) {
            this.props.poll(this.state.origin, this.state.destination, this.state.departureDate);
        }
    };

    render() {
        return (
            <React.Fragment>
                <Typography variant="h4" gutterBottom align='center'>
                    Search for bus tickets
                </Typography>

                <SearchForm cities={this.props.cities} isSearching={this.props.isSearching} onSubmit={this.handleSearch} />
                
                {this.props.isSearching && 
                    <LinearProgress />
                }
                {this.props.departures && !!this.props.departures.length && 
                    <DepartureResults
                        departures={this.props.departures} 
                        locations={this.props.locations}
                        city={this.state.destinationCity} />
                }
            </React.Fragment>
        );
    }
}

export default Search;
