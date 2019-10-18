import React from 'react';
import ContentLoader from 'react-content-loader';

const CardLoader = () => (
  <ContentLoader className="card-loader" height={40} width={300}>
    <rect x="0" y="0" rx="3" ry="3" width="300" height="5" />
    <rect x="0" y="15" rx="3" ry="3" width="300" height="5" />
    <rect x="0" y="30" rx="3" ry="3" width="300" height="5" />
  </ContentLoader>
);

export default CardLoader;
