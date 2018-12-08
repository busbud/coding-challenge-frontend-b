import React from 'react';
import ReactDOM from "react-dom";
import Search from '../api/search';

import DepartureList from './DepartureList';

/** Component that trigger a search and display results. */
export default class SearchTrigger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: {},
      loading: false,
      complete: false,
      lang: props.lang  // Lang of the results
    };
  }

  /**
   * On component mount, get search results
   */
  componentDidMount() {
    this.launchSearch(this.props.lang);
  }

  /**
   * Initialize a search
   */
  async initializeSearch() {
    this.setState({loading: true});
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
   * Launch search
   */
  async launchSearch(lang) {
    clearInterval(this.interval);
    this.setState({lang});  // Store the language of results
    this.search = new Search({lang});
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
   * Render buses departures
   */
  render() {
    const results = this.state.results;
    return (
      <div>
        {results.departures ? <DepartureList results={results} /> : <p>No results</p>}
      </div>
    );
  }

}
