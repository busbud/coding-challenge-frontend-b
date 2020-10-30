import React, { lazy, Suspense } from 'react';

export const makeLazy = (ImportStatement) => {
  const PageComponent = lazy(ImportStatement);
  return (props) => (
    <Suspense fallback={(<p>Loading ...</p>)}>
      <PageComponent {...props} />
    </Suspense>
  );
};

export default {
  makeLazy,
};
