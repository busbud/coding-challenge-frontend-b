import React from 'react';

function LoadingIndicator({ status }) {
  return (
    <div className={`loading ${status}`}>
      <div className="loading-indicator"></div>
    </div>
  );
}
LoadingIndicator.propTypes = {
  status: React.PropTypes.string.isRequired,
};

export default LoadingIndicator;
