import React from 'react';

import Amenities from './Amenities.jsx'

const Departure = React.createClass({
  render: function() {
    return (
      <div className='departure-card mdl-card mdl-shadow--2dp'>
        <div className='mdl-card__title'>
          <h3 className='mdl-card__title-text'><strong>NYC</strong>&nbsp;{this.props.departureTime},  {this.props.departureDate}</h3>
          <br />
          <h3 className='mdl-card__title-text'><strong>MTL</strong>&nbsp;{this.props.arrivalTime}, {this.props.arrivalDate}</h3>
        </div>
        <div class='mdl-card__supporting-text'>
          <strong>Time: </strong>{this.props.departureTime} on {this.props.departureDate}<br />
          <strong>From: </strong>{this.props.originLocation}<br />
          <strong>To: </strong>{this.props.destinationLocation}<br /><br />
          <strong>Operator: </strong>{this.props.operatorName}<br /><br />
          <Amenities amenities={this.props.amenities} />
        </div>
        <div className='mdl-card__actions mdl-card--border'>
          <a className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect' href={this.props.deeplink}>
            Book
          </a>
        </div>
        <div className='mdl-card__menu'>
          &#36;{this.props.price}
        </div>
    </div>
    )
  }
});

export default Departure;