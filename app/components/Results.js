var React = require('react');
var queryString = require('query-string');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');

class Results extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			cities: null,
			origin_city_id: null,
			departures: null,
			locations: null,
			operators: null,
			loading: true
		};

		this.requestDepartures = this.requestDepartures.bind(this);
	}

	componentDidMount () {
		var params = queryString.parse(this.props.location.search);

		this.requestDepartures(params);
	}

	requestDepartures (params, poll = false, index = null) {
		api.getDepartures(params, poll, index)
			.then(function (data) {
				var index = data.departures.length;

				if (data.cities) {
					this.setState(function () {
						return {
							cities: data.cities,
							origin_city_id: data.origin_city_id
						};
					});
				}

				// data.complete = false;
				console.log(data);

				if (!data.complete) {
					console.log('Going to poll');
					// Run poll after 3 seconds
					return setTimeout(function (){
						this.requestDepartures(params, true, index);
					}.bind(this), 3000);
				}
				else {
					this.setState(function () {
						return {
							departures: data.departures,
							locations: data.locations,
							operators: data.operators,
							loading: false
						};
					});
				}
			}.bind(this));
	}

	render() {
		var {loading} = this.state;

		return (
			<section className='results-container'>
				{loading
					? <Loading />
					: <div>Results</div>
				}
			</section>
		);
	}
}

Results.propTypes = {
	location: PropTypes.object.isRequired
};

module.exports = Results;