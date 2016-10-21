import React from 'react';

class Icon extends React.Component {

	render() {
		return (
			<svg className="icon" viewBox="0 0 100 100">
				<use xlinkHref={ this.props.src }  viewBox="0 0 100 100"></use>
			</svg>
		);
	}

}

export default Icon;