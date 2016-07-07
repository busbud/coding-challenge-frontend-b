import React, { PropTypes } from 'react';
import './Route.scss';

/**
 *  Component
 **/

class Route extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    let { origin, destination, date } = this.props.data.route || { origin: '', destination:'', date:'' } ;

    return (
      <div className={ 'route' + (origin ? ' route--visible':'')}>
        <div className="route-item">
          <i className="route-item__icon fa fa-location-arrow" aria-hidden="true"></i>
          {origin}
        </div>
        <div className="route-item">
          <i className="route-item__icon fa fa-map-marker" aria-hidden="true"></i>
          {destination}
        </div>
        <div className="route-item">
          <i className="route-item__icon fa fa-calendar-o" aria-hidden="true"></i>
          {date}
        </div>
      </div>

    );
  }
}

Route.propTypes = {
  translations: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};


export default Route;