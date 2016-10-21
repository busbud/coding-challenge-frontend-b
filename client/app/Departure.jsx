import React            from 'react'
import ReactTooltip     from 'react-tooltip'
import Icon             from './Icon.jsx'
import LoadingAnimation from './LoadingAnimation.jsx'

class Departure extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.departure = this.props.data;
    this.formatPrice = this.formatPrice.bind(this);
  }
  
  formatPrice(number, currency) {
    return (number / 100).toLocaleString("en-US", {style:"currency", currency: this.props.config.currency});
  }

  render() {

    var dep = this.state.departure;
    
    if(dep) {

      let amenityIcons = Object.keys(dep.amenities)
        .filter(function(amenity) {
          return dep.amenities[amenity] === true;
        }.bind(this))
        .map(function(amenity, i) {
          return (
            <div 
              key={i} 
              data-tip={this.props.config.strings['AMENITY_'+amenity.toUpperCase()]} 
              data-for={'ToolTip'} 
              data-place='top'>
              <Icon src={'/images/icons/'+amenity+'.svg#Layer_1'}/>
            </div>
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
                  <div className="col-xs-12 amenities">
                    {amenityIcons}
                  </div>
                </div>
              </div>

              <div className="col-xs-12 col-sm-3">
                <div className="row">
                  <div className="col-xs-6 col-sm-12 price">
                    {this.formatPrice(dep.prices.total)}<span className="currency">{this.props.config.currency} </span>
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
    } else {

      return (
        <div className="departure loading">
          <LoadingAnimation />
        </div>
      )

    }
  }
}

export default Departure;