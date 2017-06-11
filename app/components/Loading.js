var React = require('react');
var PropTypes = require('prop-types');

class Loading extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			text: props.text
		};
	}

	componentDidMount() {
		var stopper = this.props.text + '...';
		this.interval = window.setInterval(function () {
			if (this.state.text === stopper) {
				this.setState(function () {
					return {
						text: this.props.text
					};
				});
			} else {
				this.setState(function (prevState) {
					return {
						text: prevState.text + '.' 
					};
				});
			}
		}.bind(this), this.props.speed);
	}

	// When component unmounts we clear the interval so it's not running indefinetly 
	componentWillUnmount() {
		window.clearInterval(this.interval);
	}

	render() {
		return (
			<p className='loading'>
				{this.state.text}
			</p>
		);
	}
}

Loading.propTypes = {
	text: PropTypes.string.isRequired,
	speed: PropTypes.number.isRequired
};

Loading.defaultProps = {
	speed: 300
};

module.exports = Loading;