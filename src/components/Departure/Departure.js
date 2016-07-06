import React, { PropTypes } from 'react';
import './Departure.scss';

class Departure extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    const { departure, currency, lang } = this.props;

    //console.log('departure',departure);
    //format data before rendering
    const longLang = lang === 'FR' ? 'fr-FR' : 'en-US';
    const l10nPrice = new Intl.NumberFormat(longLang, {style:'currency', currency: currency});
    
    return (
      <div className="departure">
        <div className="departure__departure-time">
            {departure.departure_time}
        </div>
        <div className="departure__arrival-time">
            {departure.arrival_time}
        </div>
        <div className="departure__location-name">
            {departure.destination_location_id}
        </div>
        <div className="departure__price">
            {l10nPrice.format(departure.prices.total)}
        </div>
      </div>
    );
  }
}

Departure.propTypes = {
    departure: PropTypes.object.isRequired,
    currency: PropTypes.string,
    lang: PropTypes.string
};

export default Departure;