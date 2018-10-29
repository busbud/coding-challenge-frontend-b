import React from 'react';
import moment from 'moment';
import 'moment/locale/fr.js';
import './Header.css';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    const { defaultQuery, defaultParams, locale, search, searchLocation } = props;
    moment.locale(locale.lang);
    search(defaultQuery, defaultParams);
    searchLocation();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.locale.lang !== this.props.locale.lang) {
      moment.locale(nextProps.locale.lang);
    }
  }

  handleChangeLocale = (event) => {
    const { defaultQuery, defaultParams, search, changeLocale, locales } = this.props;
    const locale = locales.find(locale => locale.lang === event.target.value);
    changeLocale(locale.lang, locale.currency);
    search(defaultQuery, defaultParams);
  }

  render() {
    const { defaultQuery: query, locale, locales, schedules } = this.props;

    return (
      <div className='header'>
        <Locale
          locale={locale}
          locales={locales}
          changeLocale={this.handleChangeLocale}
          isLoading={schedules.isLoading}
        />
        <SearchStatus cities={schedules.cities} query={query} />
      </div>
    )
  }
}

const SearchStatus = ({cities, query}) => {
  return (
  <div className='search-status'>
      <div className='departure-location'>
        { cities.length > 0 && <span>{cities[0].name} - {cities[1].name}</span> }
      </div>
    <div className='departure-date'>
      {moment(query.outbound_date).format('dddd, MMM D')}
    </div>
  </div>
  )
}

const Locale = ({locale, locales, changeLocale, isLoading}) => (
  <div className='locale'>
    <select value={locale.lang} onChange={changeLocale} disabled={isLoading}>
      {locales.map(locale => <option value={locale.lang} key={locale.lang}>{locale.lang} - {locale.currency}</option>)}
    </select>
  </div>
)
