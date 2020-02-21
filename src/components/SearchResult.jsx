import React, { useState } from 'react';
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

export default SearchResult;
