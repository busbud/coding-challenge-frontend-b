var React = require('react');
var queryString = require('query-string');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');
var DepartureList = require('./DepartureList');

class Results extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			cities: null,
			departures: null,
			locations: null,
			operators: null,
			loading: true,
			error: false
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
					// Create cities object and reference by departure and arrival
					// departure is always at index 0 and arrival at 1
					var cities = {
						departure: data.cities[0],
						arrival: data.cities[1]
					};

					console.log(cities);

					this.setState(function () {
						return {
							cities: cities
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
					var locations = {}; 
					var operators = {};

					// If after polling we get no results then keep 
					// departures state to null
					if(data.departures.length === 0) {
						data.departures = null;
					}

					// Create locations object and reference each item by location id
					data.locations.map(function (location) {
						locations[location.id] = location;
					});

					// Create operators object and reference each item by operator id
					data.operators.map(function (operator) {
						operators[operator.id] = operator;
					});

					this.setState(function () {
						return {
							departures: data.departures,
							locations: locations,
							operators: operators,
							loading: false
						};
					});
				}
			}.bind(this))
			.catch(function () {
				this.setState(function () {
					return {
						error: true,
						loading: false
					};
				});
			}.bind(this));
	}

	render() {
		var {loading, 
			cities,  
			departures, 
			locations, 
			operators,
			error} = this.state;

		return (
			<section className='results-container'>
				{loading &&
					<Loading />}

				{error &&
					<p className='error'>There seems to be an error. Try refreshing the page.</p>}

				{departures == null && !loading && !error &&
					<p className='error'>Oops something went wrong. Try refreshing the page.</p>}

				{departures != null && !loading && !error &&
					<DepartureList
						cities={cities}
						departures={departures}
						locations={locations}
						operators={operators}
					/>
				}
			</section>
		);
	}
}

Results.propTypes = {
	location: PropTypes.object.isRequired
};

module.exports = Results;