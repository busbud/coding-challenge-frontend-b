import Search from './Search.jsx';
import Result from './Result.jsx';
import Filters from './Filters.jsx';

var moment = require('moment');
var classNames = require('classnames');

const Osheaga = React.createClass({

	// Get default data
	getInitialState: function(){
		return {
			departures: [],
			operators: [],
			locations: [],
			cities: [],
			search: {
				ny: 'dr5reg',
				mtl: 'f25dvk',
				date: '2016-07-29',
				adult: 1,
				sort: 'time',
				currency: 'USD',
				loading: false
			},
			lang: 'fr'
		};
	},

	// Get global translations
	getTranslations: function() {
		var translations = {
			en: {
				title: 'Find your way to us!',
				with: 'with',
				for: 'for'
			},
			fr: {
				title: 'Voyagez jusqu\'&agrave; nous!',
				with: 'avec',
				for: 'pour'
			}
		};
		return translations[this.state.lang];
	},

	// Sort departures by time
	timeSort: function(a, b) {
		return moment(a.departure_time).unix() - moment(b.departure_time).unix();
	},

	// Sort departures by prices
	priceSort: function(a, b) {
		return a.prices.total - b.prices.total;
	},

	// Set filters state. Used by nested components.
	setSearchState: function(new_search, busbud_call = true){
		var search = this.state.search;
		for (var index in new_search)
			search[index] = new_search[index];
		this.setState({search: search});
		if (busbud_call)
			this.busbudCall();
	},

	// Find an operator by it's ID
	findOperator: function(id) {
		for (var i = 0; i < this.state.operators.length; i++) {
			if (this.state.operators[i].id === id)
				return this.state.operators[i];
		}
		return false;
	},

	// Find a city by it's ID
	findCity: function(id) {
		for (var i = 0; i < this.state.cities.length; i++) {
			if (this.state.cities[i].id === id)
				return this.state.cities[i];
		}
		return false;
	},

	// Find a location by it's ID
	findLocation: function(id) {
		for (var i = 0; i < this.state.locations.length; i++) {
			if (this.state.locations[i].id === id)
			{

				var location = this.state.locations[i];
				location['city'] = this.findCity(location.city_id);
				return location;
			}
		}
		return false;
	},

	// Call Busbud API to get departures
	busbudCall: function(pool = false) {
		this.setSearchState({loading: true}, false);
		var req = new XMLHttpRequest();
		req.open('GET', 'https://napi.busbud.com/x-departures/'+this.state.search.ny+'/'+this.state.search.mtl+'/'+this.state.search.date+'?adult=1&currency='+this.state.search.currency);
		var osheaga = this;
		req.onreadystatechange = function() {
			if (req.readyState == 4)
			{
				if (req.status == 200)
				{
					var json = JSON.parse(req.responseText);
					if (!json.complete)
					{
						osheaga.busbudCall(true);
					}
					else {
						osheaga.setState({
							departures: json.departures,
							operators: json.operators,
							locations: json.locations,
							cities: json.cities
						});
						osheaga.setSearchState({loading: false}, false);
						//osheaga.forceUpdate();
					}
				}
				else {
					alert('An error occured. Did you try to turn it off and on again? ;)');
					osheaga.setSearchState({loading: false}, false);
				}
			}

		};

		req.send();
	},

	// Change app's lang
	changeLang: function(e) {
		this.setState({lang: e.target.getAttribute('data-lang')});
	},

	// Render main component
	render:function() {
		var osheaga = this;
		var translations = this.getTranslations();

		// Get and sort departures
		var departures = this.state.departures
		departures.sort((this.state.search.sort == 'price' ? this.priceSort : this.timeSort));

		return (
			<div className="container fade-in">
				<header>
					<div id="langs">
						<a onClick={this.changeLang} data-lang="en" className={classNames({active: this.state.lang == 'en'})}>EN</a>
						<a onClick={this.changeLang} data-lang="fr" className={classNames({active: this.state.lang == 'fr'})}>FR</a>
					</div>
					<img className="logo" src="img/logo.png" alt="Osheaga"/>
					<h1 dangerouslySetInnerHTML={{__html: translations.title}}></h1>
				</header>
				<Search busbudCall={this.busbudCall} lang={this.state.lang}></Search>
				{this.state.search.loading ? <div className="spinner">
					<div className="rect1"></div>
					<div className="rect2"></div>
					<div className="rect3"></div>
					<div className="rect4"></div>
					<div className="rect5"></div>
				</div> : ''}
				{departures.length ? <Filters setSearchState={this.setSearchState} sort={this.state.search.sort} currency={this.state.search.currency} lang={osheaga.state.lang}></Filters> : ''}
				{departures.map(function(d) {
					var operator = osheaga.findOperator(d.operator_id);
					if (!operator)
						return;
					var departure = osheaga.findLocation(d.origin_location_id);
					if (!departure)
						return;
					var arrival = osheaga.findLocation(d.destination_location_id);
					if (!arrival)
						return;
					return <Result key={d.id} price={d.prices.total} currency={osheaga.state.search.currency} operator={operator} link={d.links.deeplink} amenities={d.amenities} departure={departure} arrival={arrival} departureTime={d.departure_time} arrivalTime={d.arrival_time} lang={osheaga.state.lang} travelClass={d.class_name}></Result>
				})}
				<footer>
					<i className="fa fa-code" aria-hidden="true"></i> <span dangerouslySetInnerHTML={{__html: translations.with}}></span> <i className="fa fa-heart-o" aria-hidden="true"></i> <span dangerouslySetInnerHTML={{__html: translations.for}}></span> <img src="img/busbud.png" alt="busbud" />
				</footer>
			</div>
		);
	}
});

export default Osheaga;
