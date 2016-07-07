import React, { PropTypes } from 'react';
import moment from 'moment';
import './Departure.scss';

class Departure extends React.Component {
  constructor(props) {
    super(props);
  }
  getImgSrc(url, height, width) {
    if (url) {
        //replace marker tags in the URL
        return url.replace('{height}', height).replace('{width}', width);
    }
    return '';
  }
  render() {

    if (!this.props.departure) {
        return null;
    }

    const { departure, currency, lang, translations } = this.props;
    
    //static url for busbud site for the same request as this microsite
    const busbudUrl = 'https://www.busbud.com/en/bus-schedules-results/dr5reg/f25dvk?outbound-date=2016-07-29&return-date=&adults=1&children=0&seniors=0&child_ages=&senior_ages=&discount_code=&currency='+currency;

    //prepare data formatters
    const timeFormat = lang === 'FR' ? 'HH:mm' : 'h:mm A';

    let price = departure.price;
    //unfortunately, Intl is not working on Safari (at least)
    /*
        const longLang = lang === 'FR' ? 'fr-FR' : 'en-US';
        const l10nPrice = new Intl.NumberFormat(longLang, {style:'currency', currency: currency});  
        price = l10nPrice.format(price);
    */
    price = lang === 'FR' ? ''+price+' $'+currency : currency+'$ '+price;
    

    return (
      <div className="departure departure--visible">
        <div className="departure-route">
            <div className="departure-route__departure-time">
                {moment(departure.departure_time).format(timeFormat)}
            </div>
            <div className="departure-route__departure-location">
                {departure.departure_location.name}
            </div>
            <div className="departure-route__separator">
                <div className="departure-route__separator-inner"></div>
            </div>
            <div className="departure-route__arrival-time">
                {moment(departure.arrival_time).format(timeFormat)}
            </div>
            <div className="departure-route__arrival-location">
                {departure.arrival_location.name}
            </div>
        </div>
        { departure.operator ? 
            <div className="departure-company">
                <img className="departure-company__logo" 
                     src={this.getImgSrc(departure.operator.logo_url, 80 * 2, 140 * 2)} 
                     title={departure.operator.display_name} 
                     alt={departure.operator.display_name}  />
                <div className="departure-company__type">
                    {departure.class_name}
                </div>
            </div>
        : null }
        <div className="departure-price">
            <div className="departure-price__total">
                {price}
            </div>
            <a className="departure-price__select-button" 
               href={busbudUrl} 
               role="button"
               aria-label={translations.select}>
                {translations.select}
            </a>
        </div>
        
      </div>
    );
  }
}

Departure.propTypes = {
    departure: PropTypes.object,
    currency: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    translations: PropTypes.object.isRequired
};

export default Departure;