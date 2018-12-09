import React from 'react';

import LocalizedStrings from 'react-localization';
import moment from 'moment';

import SearchAPI from '../api/search';
import Header from './Header';
import OrderingPanel from './OrderingPanel';
import FilteringPanel from './FilteringPanel';
import DepartureList from './DepartureList';

import i18n from '../i18n';


/** Main component that display web page. */
export default class Search extends React.Component {
  /**
   * Eliminate duplicate obj in array
   */
  static eliminateDuplicates(array) {
    return array.filter((arr, index, self) => (
      index === self.findIndex(a => arr.id === a.id)));
  }

  /**
   * Search compoment constructor
   */
  constructor(props) {
    super(props);

    const strings = new LocalizedStrings(i18n);

    this.state = {
      results: {},
      complete: false,
      filters: {},
      currency: 'CAD',
      strings,
    };

    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.onCurrencyChange = this.onCurrencyChange.bind(this);
    this.orderBy = this.orderBy.bind(this);
    this.filterByOperator = this.filterByOperator.bind(this);
  }

  /**
   * On component mount, get search results
   */
  componentDidMount() {
    const { strings, currency } = this.state;
    const lang = strings.getLanguage();
    this.launchSearch(lang, currency);
  }

  /**
   * On component unmount, stop polling results
   */
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /**
   * Update language and relaunch search
   */
  onLanguageChange(lang) {
    const { strings, currency } = this.state;
    strings.setLanguage(lang);
    this.setState({ strings });
    this.launchSearch(lang, currency);
  }

  /**
   * Update currency and relaunch search
   */
  onCurrencyChange(currency) {
    const { strings } = this.state;
    this.setState({ currency });
    const lang = strings.getLanguage();
    this.launchSearch(lang, currency);
  }

  /**
   * Merge polled results with existing departures
   */
  getUpdatedResults(newResults) {
    const { results } = this.state;
    // We first concat brutally the 2 arrays
    let departures = results.departures.concat(newResults.departures);
    let operators = results.operators.concat(newResults.operators);
    // Then remove duplicate elements.
    departures = Search.eliminateDuplicates(departures);
    operators = Search.eliminateDuplicates(operators);

    return {
      ...results,
      departures,
      operators,
    };
  }

  /**
   * Poll results every 3 seconds
   */
  async pollResults() {
    // Is there a pending poll request
    let pending = false;

    this.interval = setInterval(async () => {
      const { complete, results } = this.state;
      // If not all results polled and no pending requests
      if (!complete && !pending) {
        // We are currently polling results
        pending = true;
        // We define the search index as the number of results already polled
        const index = results.departures.length;
        // Let's poll results
        const search = await this.search.poll(index);
        // Polling is now complete
        pending = false;
        // Let's update current state
        const updatedResults = this.getUpdatedResults(search);
        this.setState({
          results: updatedResults,
          complete: search.complete,
        });
      } else if (complete) {
        // We have all the results we can stop polling
        clearInterval(this.interval);
      }
    }, 3000);
  }

  /**
   * Initialize a search
   */
  async initializeSearch() {
    // We reset state as it is a new search
    this.setState({
      results: {},
      complete: false,
    });
    const results = await this.search.initialize();
    this.setState({ results });
  }

  /**
   * Order results. Possible choices ; earliest, latest, cheapest, fastest
   */
  orderBy(orderType) {
    const { results } = this.state;
    const { departures } = results;
    departures.sort((a, b) => {
      if (orderType === 'earliest') {
        return (moment(a.departure_time).isAfter(moment(b.departure_time))) ? 1 : -1;
      }
      if (orderType === 'latest') {
        return (moment(a.departure_time).isBefore(moment(b.departure_time))) ? 1 : -1;
      }
      if (orderType === 'cheapest') {
        return (a.prices.total > b.prices.total) ? 1 : -1;
      }
      if (orderType === 'fastest') {
        const durationA = moment(a.arrival_time).diff(moment(a.departure_time));
        const durationB = moment(b.arrival_time).diff(moment(b.departure_time));
        return (durationA > durationB) ? 1 : -1;
      }
      throw new Error('Order filter not implemented !');
    });
    const newResults = {
      ...results,
      departures,
    };
    this.setState({ results: newResults });
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
    let newFilters;
    let filtersUpdated = false;

    const { filters, results } = this.state;
    if (!filters.operators && isChecked) {
      // No filter applied yet. Create a filter.
      newFilters = {
        unfilteredResults: results,
        operators: [operatorId],
      };
      filtersUpdated = true;
    } else {
      // Update existing filter
      const { operators } = filters;
      const index = operators.indexOf(operatorId);
      if (!isChecked) {
        // One operator filter is removed
        if (index !== -1) {
          operators.splice(index, 1);
          newFilters = {
            ...filters,
            operators,
          };
          filtersUpdated = true;
        }
      } else if (index === -1) {
        // one filter is added
        operators.push(operatorId);
        newFilters = {
          ...filters,
          operators,
        };
        filtersUpdated = true;
      }
    }

    // Then apply filters
    if (filtersUpdated) {
      let newResults;
      if (newFilters.operators.length === 0) {
        newResults = filters.unfilteredResults;
      } else {
        const departures = newFilters.unfilteredResults.departures.filter(departure => (
          newFilters.operators.indexOf(departure.operator_id) !== -1
        ));
        newResults = {
          ...newFilters.unfilteredResults,
          departures,
        };
      }
      this.setState({ results: newResults, filters: newFilters });
    }
  }

  /**
   * Launch search
   */
  async launchSearch(lang, currency) {
    clearInterval(this.interval);
    this.search = new SearchAPI({ lang, currency });
    this.initializeSearch();
    this.pollResults();
  }

  /**
   * Render ordering panel, filter panel and results
   */
  renderResults() {
    const { results, strings, currency } = this.state;
    if (!results.departures) {
      return (
        <div className="container">
          <div className="panel">
            <p>{strings.unstarted}</p>
          </div>
        </div>
      );
    }
    return (
      <div>
        <OrderingPanel
          strings={strings}
          nbResults={results.departures.length}
          orderBy={this.orderBy}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <FilteringPanel
                operators={results.operators}
                filterByOperator={this.filterByOperator}
              />
            </div>
            <div className="col-md-8">
              <DepartureList
                results={results}
                currency={currency}
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
    const { strings, currency } = this.state;
    return (
      <div>
        <Header
          strings={strings}
          currency={currency}
          onLanguageChange={this.onLanguageChange}
          onCurrencyChange={this.onCurrencyChange}
        />
        {this.renderResults()}
      </div>
    );
  }
}
