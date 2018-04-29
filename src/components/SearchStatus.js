import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import SearchButton from './SearchButton';

const SearchStatus = ({ searchStatus, searchNow }) => {
  const pickInnerElement = () => {
    switch (searchStatus) {
      case 'uninitiated':
        return <SearchButton className="search-button" onClick={searchNow} />;
      case 'inProgress':
        return <CircularProgress className="search-progress" />;
      case 'complete':
        return <span className="search-complete">Search Complete</span>;
      case 'error':
      default:
        return (
          <p className="search-error">
            {'There was an error loading some of your results; ' +
                'please refresh the page and try again.'}
          </p>
        );
    }
  };

  return (
    <div className="search-status" >
      {pickInnerElement()}
    </div>
  );
};

SearchStatus.propTypes = {
  searchNow: PropTypes.func.isRequired,
  searchStatus: PropTypes.string.isRequired,
};

export default SearchStatus;
