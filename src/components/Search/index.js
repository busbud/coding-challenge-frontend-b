import { ActionCreators } from '../../domains/search';

import { Search } from './Search';

const mapStateToProps = (state) => {
  const { search } = state;

  return {
    propsedTrips: search.proposedTrips,
    isLoading: search.isLoading,
  };
};
const mapDispatchToProps = {
  onPerformSearch: ActionCreators.onPerformSearch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
