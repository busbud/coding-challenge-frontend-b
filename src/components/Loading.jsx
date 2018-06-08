import React from 'react';

import './styles/Loading.scss';

export default function Loading() {
  return (
    <div className="Loading">
      <div className="Loading__circle" />
      <div className="Loading__message">Please wait we are loading the magic</div>
    </div>
  );
}
