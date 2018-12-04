import React from 'react';
import {Search} from '../api';
import SearchList from './SearchList';

export default class SearchContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.search = new Search('dr5reg', 'f25dvk', '2019-08-12', {adult: 1});

    this.state = {
      results: [],
      loading: false,
      complete: false
    };
  }

  async componentDidMount() {
    const result = await this.search.intialSearch();

    this.setState(result);

    let pending = false;

    this.interval = setInterval(async () => {
      if (!this.state.complete && !pending) {
        pending = true;
        const index = this.state.results.length;

        const pollSearch = await this.search.pollSearch(index);
        const results = [...this.state.results, ...pollSearch.results];
        const complete = pollSearch.complete;

        pending = false;
        this.setState({results, complete});
      } else if (this.state.complete) {
        clearInterval(this.interval);
      }
    }, 300);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  render() {
    const {results} = this.state;

    return <div>Hello<SearchList results={results}/></div>;
  }
}
