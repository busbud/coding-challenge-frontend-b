	import React, { Component } from 'react';
	import moment from 'moment';
	import _ from 'lodash';
	import './App.css';

	const base_url = 'http://localhost:3000/api';

	class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			languages :[
				{title : 'English', value: 'CA'},
				{title : 'French', value: 'FR'},
			], 
			data: {
				departures : [],
				locations : [],
				cities : [],
				operators : [],
				completed : false
			},
			search : {
				origin : 'dr5reg',
				destination : 'f25dvk',
				outbound_date: moment('2018-08-02').format("YYYY-MM-DD"),
				adult : 1,
				child : 0,
				senior : 0,
				lang : 'CA',
				currency : 'CAD',
				index : 0        
			}
		};
	}
	componentDidMount() {
		this.poll()
	}
	poll () {
		var queryString = Object.values(this.state.search).join('/').replace(/^\//, '');
		var API = base_url+'/'+queryString
		var that = this
			fetch(API)
			.then(
				response => response.json())
			.then(
				data => {

					// Set index length based on returned departures count
					that.state.search.index = data.departures.length
					
					that.setState({ data: data, search : that.state.search }, function(){

						// If we are missing data, we check again 
						if(data.complete===false){
							setTimeout(function() {that.poll()}, 4000);
						}
					
					})

				}
			)
	}
	
	displaySpinner(){
		/**
		 * If completed is false || no departures are found return true
		 */
		return (this.state.data.completed===false || this.state.data.departures.length===0)

	}
	changeLang(event){
		var that = this
		let search = Object.assign({}, this.state.search); 
		let data = Object.assign({}, this.state.data); 
		search.lang = event.target.value;
		data.completed = false;
		this.setState({search : search, data : data}, function(){
			that.poll()
		})
	}
	render() {
		const departures = this.state.data.departures;
		const operators = this.state.data.operators;
		const locations = this.state.data.locations;

		return (
			<div className="App">
			<header className="App-header">
				<div className="row">
					<div className="col-sm-10"></div>
					<div className="col-sm-2 form-inline">
						<LangSwitch languages={this.state.languages} language={this.state.search.lang} changeLang={this.changeLang.bind(this)} />
					</div>
				</div> 			
				<div className="row">
					<div className="col-sm-12">Lists all the departures for a given origin city (New York - geohash: dr5reg) and a given destination city (Montréal - geohash: f25dvk) for a given day (the 2nd of August 2018) for 1 adult.
					</div>
				</div>	
			</header>
			
			{/** Completed : False Spinner */}
			{this.displaySpinner() && (
					<div className="loading">Loading&#8230;</div>
				)
			}
			<div>
				{departures.map(departure => {
					return(
					<XDeparture departure={departure} 
								operator={_.find(operators, {id : departure.operator_id})} 
								location={_.find(locations, {id : departure.destination_location_id})}
								destination_location={_.find(locations, {id : departure.destination_location_id})}
								origin_location={_.find(locations, {id : departure.origin_location_id})}
								key={departure.id}
							/>
					)
				})}
			</div>

			</div>
		);
		}

	}

	/** 
	 * Returns HTML Markup a single Departure
	 * 
	 * @param object departure 
	 * 
	*/
	class XDeparture extends Component{
		render(){
			return ( 
			<div className="row destination-card"> 
			
				<div className="col-sm-2">
					<img src={this.props.operator.logo_url} alt={this.props.operator.display_name} height="43"/>
				</div>
				<div className="col-sm-4">
					<div><strong>Departure:</strong> {this.props.origin_location.name} </div> 
					<div>{this.props.origin_location.address.toString()}</div>
					<div><strong>{moment(this.props.departure.departure_time).format("hh:mm a")}</strong></div>
				</div>
				<div className="col-sm-4">
					<div><strong>Destination:</strong> {this.props.destination_location.name}</div>
					<div>{this.props.destination_location.address.toString()}</div> 
					<div><strong>{moment(this.props.departure.arrival_time).format("hh:mm a")}</strong></div>
				</div>
				<div className="col-sm-2">
					<div>{this.props.departure.class}</div> 
					<div><strong>${(this.props.departure.prices.total / 100).toFixed(2)} {this.props.departure.prices.currency}</strong></div>
				</div>         

			</div> 
		)
		}
	}

	class LangSwitch extends Component{
		render (){
			return(
			<div>
				<select className="form-control" onChange={this.props.changeLang} value={this.props.language}>
					{this.props.languages.map((lang, i) => {
						return (
							<option key={i} value={lang.value}>{lang.title}</option>
						)
					})}
				</select>
			</div>
			)
		}
	}

	export default App;
