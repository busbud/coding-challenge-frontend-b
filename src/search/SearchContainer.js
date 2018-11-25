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
        isCompleteResults: searchReducer.isCompleteResults,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        clearSearchResults: searchOperations.clearSearchResults,
        getCity: searchOperations.getCity,
        search: searchOperations.search,
        poll: searchOperations.poll,
    }, dispatch);
}

const SearchContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);
  
export default SearchContainer;
