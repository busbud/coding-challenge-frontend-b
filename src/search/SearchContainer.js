import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Search from './Search';
import { searchOperations } from './duck';

function mapStateToProps(state) {
    const { searchReducer } = state;
    return {
        results: searchReducer.results,
        isSearching: searchReducer.isSearching,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        search: searchOperations.search,
    }, dispatch);
}

const SearchContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);
  
export default SearchContainer;
