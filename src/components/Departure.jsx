import React from 'react';

import Amenities from './Amenities.jsx'

import counterpart from 'counterpart';
import Translate from 'react-translate-component';

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
          <Translate 
            component='span' scope='Departure' content='time' 
            with={{
              departureTime: this.props.departureTime,
              departureDate: this.props.departureDate
            }} /><br />
          <Translate
            component='span' scope='Departure' content='from' 
            with={{ originLocation: this.props.originLocation }} /><br />
          <Translate
            component='span' scope='Departure' content='to' 
            with={{ destinationLocation: this.props.destinationLocation }} /><br /><br />
          <Translate
            component='span' scope='Departure' content='operator' 
            with={{ operatorName: this.props.operatorName }} /><br /><br />
          <Amenities amenities={this.props.amenities} />
        </div>
        <div className='mdl-card__actions mdl-card--border'>
          <a className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect' href={this.props.deeplink}>
            <Translate component='span' scope='Departure' content='book' />
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