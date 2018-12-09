import React from 'react';
import ReactDOM from "react-dom";

import LocalizedStrings from 'react-localization';
import moment from 'moment';

import SearchAPI from '../api/search';
import Header from './Header';
import OrderingPanel from './OrderingPanel';
import FilteringPanel from './FilteringPanel';
import DepartureList from './DepartureList';

import { i18n } from '../i18n';


/** Main component that display web page. */
export default class Search extends React.Component {

  constructor(props) {
    super(props);

    const strings = new LocalizedStrings(i18n);

    this.state = {
      results: {},
      loading: false,
      complete: false,
      filters: {},
      strings
    };

    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.orderBy = this.orderBy.bind(this);
    this.filterByOperator = this.filterByOperator.bind(this);
  }

  /**
   * Update language
   */
  onLanguageChange(lang) {
    this.state.strings.setLanguage(lang);
    this.setState({strings: this.state.strings});
    this.launchSearch(lang);
  }

  /**
   * On component mount, get search results
   */
  componentDidMount() {
    this.launchSearch(this.state.strings.getLanguage());
  }

  /**
   * Initialize a search
   */
  async initializeSearch() {
    // We reset state as it is a new search
    this.setState({
      results: {},
      loading: true,
      complete: false
    });
    const results = await this.search.initialize();
    this.setState({loading: false, results});  
  }

  /**
   * Poll results every 3 seconds
   */
  async pollResults() {
    // Is there a pending poll request
    let pending = false;

    this.interval = setInterval(async () => {
      // If not all results polled and no pending requests
      if (!this.state.complete && !pending) {
        // We are currently polling results
        pending = true;
        // We define the search index as the number of results already polled
        const index = this.state.results.departures.length;
        // Let's poll results
        const search = await this.search.poll(index);
        // Polling is now complete
        pending = false;
        // Let's update current state
        const updatedResults = this.getUpdatedResults(search);
        this.setState({
          results: updatedResults,
          complete: search.complete
        })
      } else if (this.state.complete) {
        // We have all the results we can stop polling
        clearInterval(this.interval);
      }
    }, 3000);
  }

  /**
   * Merge polled results with existing departures
   */
  getUpdatedResults(newResults) {
    const oldResults = this.state.results;
    const departures = oldResults.departures.concat(newResults.departures);
    const operators = oldResults.operators.concat(newResults.operators);
    return {
      ...oldResults,
      departures,
      operators
    }
  }

  /**
   * Order results. Possible choices ; earliest, latest, cheapest, fastest
   */
  orderBy(orderType) {
    let departures = this.state.results.departures;
    departures.sort((a, b) => {
      if (orderType == "earliest") {
        return (moment(a.departure_time).isAfter(moment(b.departure_time))) ? 1 : -1;
      }
      else if (orderType == "latest") {
        return (moment(a.departure_time).isBefore(moment(b.departure_time))) ? 1 : -1;
      }
      else if (orderType == "cheapest") {
        return (a.prices.total > b.prices.total) ? 1 : -1;
      }
      else if (orderType == "fastest") {
        const durationA = moment(a.arrival_time).diff(moment(a.departure_time));
        const durationB = moment(b.arrival_time).diff(moment(b.departure_time));
        return (durationA > durationB) ? 1 : -1;
      }
      else {
        throw new Error("Order filter not implemented !");
      }
    });
    const results = {
      ...this.state.results,
      departures
    };
    this.setState({results});
  }

  /**
   * Filter results by operator
   *
   * We store a list of unfiltered results in state.
   * We also store the filters applied.
   *
   * TODO: this method is too long and should be refactored
   */
  filterByOperator(operatorId, isChecked) {
    let filters;
    let filtersUpdated = false;

    // No filtering yet
    if (!this.state.filters.operators && isChecked) {
      // No filter applied yet. Start filtering.
      filters = {
        unfilteredResults: this.state.results,
        operators: [operatorId]
      };
      filtersUpdated = true;
    }

    // Update existing filtering
    else {
      let operators = this.state.filters.operators;
      const index = operators.indexOf(operatorId);
      if (!isChecked) {
        // One filter is removed
        if (index !== -1) {
          operators.splice(index, 1);
          filters = {
            ...this.state.filters,
            operators
          };
          filtersUpdated = true;
        }
      }
      else {
        // one filter is added
        if (index === -1) {
          operators.push(operatorId);
          filters = {
            ...this.state.filters,
            operators
          };
          filtersUpdated = true;
        }
      }
    }

    // Then apply filters
    if (filtersUpdated) {
      let results;
      if (filters.operators.length === 0) {
        results = filters.unfilteredResults;
      }
      else {
        const departures = filters.unfilteredResults.departures.filter((departure) => {
          if (filters.operators.indexOf(departure.operator_id) !== -1) {
            return true;
          }
        });
        results = {
          ...filters.unfilteredResults,
          departures
        }
      }
      this.setState({filters, results});
    }
  }

  /**
   * Launch search
   */
  async launchSearch(lang) {
    clearInterval(this.interval);
    this.search = new SearchAPI({lang});
    this.initializeSearch();
    this.pollResults();
  }

  /**
   * On component unmount, stop polling results
   */
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /**
   * Render ordering panel, filter panel and results
   */
  renderResults() {
    if (!this.state.results.departures) {
      return (
        <div className="container">
          <div className="panel">
            <p>{this.state.strings.unstarted}</p>
          </div>
        </div>
      );
    }
    return (
      <div>
        <OrderingPanel
          strings={this.state.strings}
          nbResults={this.state.results.departures.length}
          orderBy={this.orderBy}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <FilteringPanel
                operators={this.state.results.operators}
                filterByOperator={this.filterByOperator}
              />
            </div>
            <div className="col-md-8">
              <DepartureList
                results={this.state.results}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Render departure item
   */
  render() {
    return (
      <div>
        <Header 
          strings={this.state.strings}
          onLanguageChange={this.onLanguageChange}
        />
        {this.renderResults()}
      </div>
    );
  }

}