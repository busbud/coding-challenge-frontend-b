// thired part libraries
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// actions
import { getDepartures } from '../../actions/depatureActions'

// helper function
import { getDeparturesWithCityAndPrices } from './helper';

// components
import Loader from '../Loader'
import Card from '../Card'
import Search from '../Search'

// styles
import './Content.scss'

const Content = ({ departures, fetching, getDepartures }) => {
  const [departuresDetails, setDeparturesDetails] = useState([]);

  useEffect(() => {
    const compelete = (departures && departures.data.complete) || false
    if (departures && departures.data && departures.data.complete) {
      const allDepartures = getDeparturesWithCityAndPrices(departures.data);
      setDeparturesDetails(allDepartures);
    }
    if (!fetching && !compelete) {
      getDepartures(
        'dr5reg',
        'f25dvk',
        '2020-11-02'
      )
    }

  }, [fetching, departures, getDepartures])

  return (
    <div className="content-container">
      <Search />
      <div className="content-container__items">
        {fetching ? <Loader /> :
          departuresDetails.map((item, index) => <Card {...item} key={'departure_card' + index} />)
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  departures: state.departures,
  fetching: state.fetching
});


export default connect(mapStateToProps, { getDepartures })(Content);
