import { connect } from 'react-redux';
import { ActionCreators } from '../../domains/search';

import { Search } from './Search';

const mapStateToProps = (state) => {
  const { search } = state;

  return {
    proposedTrips: search.proposedTrips,
    isLoading: search.isLoading,
  };
};

const mapDispatchToProps = {
  onSearch: ActionCreators.initSearch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
