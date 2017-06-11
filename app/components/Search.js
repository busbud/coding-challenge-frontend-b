var React = require('react');
var {Link} = require('react-router-dom');
var PropTypes = require('prop-types');
var SelectLanguage = require('./SelectLanguage');
var Locale = require('../utils/locale.json');

class Search extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			departure: 'New York, New York, United States',
			origin: 'dr5reg',
			arrival: 'Montreal, Quebec, Canada',
			destination: 'f25dvk',
			outbound_date: '2017-07-29',
			adult: 1,
			selectedLanguage: 'en'
		};

		this.updateLanguage = this.updateLanguage.bind(this);
	}

	componentDidMount () {
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage (lang) {
		this.setState(function () {
			return {
				selectedLanguage: lang
			};
		});
	}

	render() {
		var {departure, origin, arrival, destination, outbound_date, adult, selectedLanguage} = this.state;
		var match = this.props.match;

		return (
			<section className='search'>
				<SelectLanguage 
					selectedLanguage={selectedLanguage} 
					onSelect={this.updateLanguage} />
				<div className='search-container'>
					<div className='search-item'>
						<i className="search-item-icon fa fa-location-arrow" aria-hidden="true"></i>
						{departure}
					</div>
					<div className='search-item'>
						<i className="search-item-icon fa fa-map-marker" aria-hidden="true"></i>
						{arrival}
					</div>
					<div className='search-item'>
						<i className="search-item-icon fa fa-calendar-o" aria-hidden="true"></i>
						{outbound_date}
					</div>
					<div className='search-item'>
						<i className="search-item-icon fa fa-user" aria-hidden="true"></i>
						{adult}
					</div>
				</div>
				<Link className='btn'
					to={{
						pathname: match.url + 'results',
						search: '?origin=' + origin + '&destination=' + destination + '&outbound_date=' + outbound_date + '&adult=' + adult + '&lang=' + selectedLanguage
					}}>
				{Locale[selectedLanguage].searchButton}</Link>
			</section>
		);
	}
}

Search.propTypes = {
	match: PropTypes.object.isRequired
};

module.exports = Search;