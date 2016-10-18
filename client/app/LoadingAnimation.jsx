import React from 'react';

class LoadingAnimation extends React.Component {

	render() {
		return (
			<div className="loadingAnimation">
			  <div className="loadingAnimation">
          <div className="loadingAnimationSpinner" />
          <div className="loadingAnimationSpinner" />
        </div>
			</div>
		);
	}

}

export default LoadingAnimation;