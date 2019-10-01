import React, { Component } from 'react';
import SearchBox from '../components/searchBox.js';
import ListCard from '../components/listCard.js';
import Api from '../utils/api.js';
import FormatHelper from '../utils/formatHelper.js';
import FunctionHelper from '../utils/functionHelper.js';
import { defaultCurrency, defaultSearchAdult, defaultSearchDate,
    defaultDepart, defaultArrive, loopApiTime } from '../config.js';

import '../styles/search.scss';

class Search extends Component {
  constructor(props) {
    super(props)
    this.interval = null;
    this.state = {
      searchAttribute: {
        departCity: defaultDepart,
        arriveCity: defaultArrive,
        searchDate: defaultSearchDate
      },
      searchParams: {
        adult: defaultSearchAdult
      },
      searchResult: {
        locations: [],
        departures: [],
        operators: []
      }
    }
  }

  clickSearch = () => {
    Api.searchBus(this.state.searchAttribute, this.state.searchParams)
      .then(res => {
        this.setState({ searchResult: res.data })
        return res.data;
      }).then(res => {
        if (!res.complete) {
          this.interval = setInterval(this.getMoreData , loopApiTime);
        }
      })
  }

  getMoreData() {
    this.setState({
       searchParams: {...this.state.searchParams, ...{ index: this.state.searchResult.departures.length }}
    }, () => {
      Api.searchPoll(this.state.searchAttribute, this.state.searchParams)
        .then(res => {
          this.setState( prevState => ({
            searchResult: FunctionHelper.mergeDeep(prevState, res.data)
          }))
          return res.data;
        }).then(res => {
          if (res.complete) {
            clearInterval(this.interval);
          }
      })
    })
  }

  getLocationData = (locatoinId) => {
    return this.state.searchResult.locations.find(item =>
      item.id === locatoinId
    )
  }

  getOperatorData = (operatorId) => {
    return this.state.searchResult.operators.find(item =>
      item.id === operatorId
    )
  }

  render() {
    return (
      <div className="search">
        <SearchBox
          clickSearch={this.clickSearch}
        />
        { this.state.searchResult.departures.map((item, i) => (
          <ListCard key={i}
            price={FormatHelper.priceFormatter(defaultCurrency, item.prices.total)}
            departureTime={FormatHelper.getLocalTime(item.departure_time, item.departure_timezone)}
            arrivalTime={FormatHelper.getLocalTime(item.arrival_time, item.arrival_timezone)}
            departureStation={this.getLocationData(item.origin_location_id)}
            arrivalStation={this.getLocationData(item.destination_location_id)}
            operator={this.getOperatorData(item.operator_id)}
          />
        ))}
      </div>
    )
  }
}

export default Search;
