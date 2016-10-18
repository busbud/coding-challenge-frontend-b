import React     from 'react';
import moment    from 'moment';
import API       from './API.jsx';
import Departure from './Departure.jsx';

class DepartureList extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			results: { departures: [false, false, false, false, false]},
			config: this.props.config
		};
		this.fetch = this.fetch.bind(this);
	}
  
	fetch() {

		if(this.fetchInterval) clearTimeout(this.fetchInterval);

			this.setState({
				error: false
			});

		API
		.setConfig(this.state.config)
		.fetchDepartures({
			origin:        this.state.config.origin.geoHash,
			destination:   this.state.config.destination.geoHash,
			departureDate: this.state.config.departureDate
		})
		.then(function(data) {
			
			this.setState({
				results: data
			});

			//When our results expire, reload them
			this.fetchInterval = setTimeout(this.fetch, data.ttl*1000);

		}.bind(this))
		.catch(function(err) {
			this.setState({
				error: err.error
			})
			
		}.bind(this))
	}

	componentDidMount() {

		this.fetch();
				
	}

	render() {
		
		if(this.state.error) {
			return (
				<div className="DepartureList">
					<div className="row">
						<div className="col-xs-12">
						<div className="errorBanner">
							{this.state.error} <button onClick={this.fetch}>Try again</button>
						</div>
							
						</div>
						<div className="col-xs-12">
							
						</div>
					</div>
				</div>
			);
		}
			var departures = this.state.results.departures.map(function(departure, i) {
				return (
					<Departure key={departure.id || i} data={departure} config={this.state.config}/>
				);
			}.bind(this));
			
			return (
				<div className="DepartureList">
					{departures}
				</div>
			);
		
	}
}

export default DepartureList;