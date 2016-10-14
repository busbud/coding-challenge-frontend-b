import React from 'react';
import Icon  from './Icon.jsx';

class Departure extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.state.departure = this.props.data;
		this.formatPrice = this.formatPrice.bind(this);
	}
  
	formatPrice(number, currency) {
		return (number / 100).toLocaleString("en-US", {style:"currency", currency:"USD"});
	}
 
	render() {
		
		var dep = this.state.departure;
		
		let amenityIcons = Object.keys(dep.amenities)
			.filter(function(amenity) {
				return dep.amenities[amenity] === true;
			}.bind(this))
			.map(function(amenity, i) {
				return (
					<Icon key={i} src={'/images/icons/'+amenity+'.svg#Layer_1'} />
				);
			}.bind(this));
			
		return (
			<div className="departure" data-departureid={dep.id}>
				<div className="depatureInner">
					<div className="row">
					
						<div className="col-xs-6 col-sm-3">
							<div className="row">
								<div className="col-xs-12 labelText">
									{this.props.config.strings.PICKUP}
								</div>
								<div className="col-xs-12 time">
									{dep.departure_display_time}
								</div>
								<div className="col-xs-12 location">
									{dep.origin_location_name}
								</div>
							</div>
						</div>
						
						<div className="col-xs-6 col-sm-3">
							<div className="row">
								<div className="col-xs-12 labelText">
									{this.props.config.strings.DROP_OFF}
								</div>
								<div className="col-xs-12 time">
									{dep.arrival_display_time}
								</div>
								<div className="col-xs-12 location">
									{dep.destination_location_name}
								</div>
							</div>
						</div>
						
						<div className="col-xs-12 col-sm-3">
							<div className="row">
								<div className="col-xs-12 labelText">
									{dep.operator_display_name} {dep.amenities.display_name}
								</div>
							</div>
							<div className="row">
								<div className="col-xs-12">
									{amenityIcons}
								</div>
							</div>
						</div>

						<div className="col-xs-12 col-sm-3">
							<div className="row">
								<div className="col-xs-6 col-sm-12 price">
									{this.formatPrice(dep.prices.total)}<span className="currency">{dep.terms.currency} </span>
								</div>
								<div className="col-xs-6 col-sm-12">
									<a className="button pull-right" href={dep.links.deeplink}>
										{this.props.config.strings.BUY}
									</a>
								</div>
							</div>
						</div>
						
					</div>
				</div>
			</div>
		);
	}
}

export default Departure;