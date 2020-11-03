import React, { lazy, Suspense } from 'react';

export const makeLazy = (ImportStatement, FallBackComp) => {
  const LazyComp = lazy(ImportStatement);
  return (props) => (
    <Suspense fallback={FallBackComp || (<p>Loading ...</p>)}>
      <LazyComp {...props} />
    </Suspense>
  );
};

export default {
  makeLazy,
};
