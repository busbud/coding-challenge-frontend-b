import { connect } from 'react-redux';
import SearchStatus from '../components/SearchStatus';
import { initializeSearch } from '../actions';

const mapStateToProps = ({ metadata: { searchStatus } }) => {
  return { searchStatus };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchNow: () => dispatch(initializeSearch()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchStatus);
