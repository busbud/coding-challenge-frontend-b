import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Search from './Search';
import { searchOperations } from './duck';

function mapStateToProps(state) {
    const { searchReducer } = state;
    return {
        departures: searchReducer.departures,
        locations: searchReducer.locations,
        cities: searchReducer.cities,
        isSearching: searchReducer.isSearching,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCity: searchOperations.getCity,
        search: searchOperations.search,
    }, dispatch);
}

const SearchContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);
  
export default SearchContainer;
