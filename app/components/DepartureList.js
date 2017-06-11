var React = require('react');
var PropTypes = require('prop-types');
var moment = require('moment');
var Locale = require('../utils/locale.json');

function DepartureItem (props) {
	var {departure,
		origin_location,
		destination_location,
		operator, 
		cities,
		selectedLanguage} = props;

	var timeFormat = selectedLanguage === 'en' ? 'h:mm A' : 'HH:mm';

	var priceStr = departure.prices.total.toString();
	var integer = priceStr.substring(0, priceStr.length - 2);
	var fraction = priceStr.substring(priceStr.length - 2);
	var price = selectedLanguage === 'en'
		? 'USD$ ' + integer + '.' + fraction
		: integer + '.' + fraction + ' $USD';

	var locale = Locale[selectedLanguage];

	function getImageSrc (url, height, width) {
		if (url) {
			//replace marker tags in the URL
			return url.replace('{height}', height)
				.replace('{width}', width);
		}
		
		return '';
	}

	return (
		<li className='departure-item'>
			<div className='route'>
				<div className='route-time'>
					{moment(departure.departure_time).format(timeFormat)}
				</div>
				<div className='route-name'>
					<p>{origin_location.name}</p>
					<p className='route-city'>{cities.departure.name}</p>
				</div>
				<div className='route-separator'>
					<i className='fa fa-arrow-down' aria-hidden='true'></i>
				</div>
				<div className='route-time'>
					{moment(departure.arrival_time).format(timeFormat)}
				</div>
				<div className='route-name'>
					<p>{destination_location.name}</p>
					<p className='route-city'>{cities.arrival.name}</p>
				</div>
			</div>
			{operator 
				? <div className='departure-operator'>
						<img className='operator-logo'
							src={getImageSrc(operator.logo_url, 140, 80)}
							alt={operator.display_name + ' logo'}
						/>
					</div>
				: null
			}
			<div className='departure-price'>
				<p className='departure-price-total'>{price}</p>
				<a href={departure.links.deeplink} target='_blank' rel='noopener noreferrer'>
					<button className='btn'>{locale.selectButton}</button>
				</a>
			</div>
		</li>
	);
}

DepartureItem.propTypes = {
	departure: PropTypes.object.isRequired,
	origin_location: PropTypes.object.isRequired,
	destination_location: PropTypes.object.isRequired,
	operator: PropTypes.object.isRequired,
	cities: PropTypes.object.isRequired,
	selectedLanguage: PropTypes.string.isRequired
};

class DepartureList extends React.Component {
	render() {
		var {departures, 
			locations,
			operators,
			cities,
			selectedLanguage} = this.props;

		return (
			<ul className='departure-list'>
				{departures.map(function (departure) {
					return (
						<DepartureItem 
							key={departure.id}
							departure={departure}
							origin_location={locations[departure.origin_location_id]}
							destination_location={locations[departure.destination_location_id]}
							operator={operators[departure.operator_id]}
							cities={cities}
							selectedLanguage={selectedLanguage}
						/>
					);
				}.bind(this))}
			</ul>
		);
	}
}

DepartureList.propTypes = {
	departures: PropTypes.array.isRequired,
	locations: PropTypes.object.isRequired,
	operators: PropTypes.object.isRequired,
	cities: PropTypes.object.isRequired,
	selectedLanguage: PropTypes.string.isRequired
};

module.exports = DepartureList;