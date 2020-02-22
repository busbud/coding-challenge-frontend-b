import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchResultItem from './SearchResultItem';

function SearchResult({ results = [] }) {
  const [selectedResultId, setSelecteedReesultId] = useState();
  const toggleSelectedResult = id => {
    const newSelectedId = id !== selectedResultId ? id : null;
    setSelecteedReesultId(newSelectedId);
  };

  return results.map(result => (
    <SearchResultItem
      key={result.id}
      selected={result.id === selectedResultId}
      {...result}
      onClick={toggleSelectedResult}
    />
  ));
}

SearchResult.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object)
};

export default SearchResult;
