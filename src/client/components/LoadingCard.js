import React from 'react';
import CardLoader from './CardLoader';

const LoadingCard = props => {
  return (
    <div className="card" id="loading-card">
      <CardLoader />
    </div>
  );
};

export default LoadingCard;
