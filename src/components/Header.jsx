import React from 'react';
import moment from 'moment';
import './Header.css';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    const { defaultQuery, defaultParams, search } = props;
    search(defaultQuery, defaultParams);
  }

  render() {
    const { defaultQuery: query, defaultCities: cities } = this.props

    return (
      <div className='header'>
        <SearchStatus cities={cities} query={query} />
      </div>
    )
  }
}

const SearchStatus = ({cities, query}) => (
  <div className='search-status'>
    <div className='departure-location'>
      {cities.origin} - {cities.destination}
    </div>
    <div className='departure-date'>
      {moment(query.outbound_date).format('dddd, MMM D')}
    </div>
  </div>
)
